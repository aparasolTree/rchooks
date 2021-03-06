import { Fn, hasOwn } from '@rchooks/shared';
import { ProxyOptions, reactive } from './reactive';

const shallowSymbol = Symbol('baseHandler shallow');

function createGetter(update: Fn, options?: ProxyOptions) {
    return function get(target: object, prop: string | symbol, receiver: object) {
        if (prop === 'raw') return target;
        const result = Reflect.get(target, prop, receiver);
        if (typeof result === 'object' && result !== null) {
            if (options?.isShallow) {
                result[shallowSymbol] = true;
            }
            return reactive(result, update, options);
        }
        return result;
    };
}

function createSetter(update: Fn, options?: ProxyOptions) {
    return function set(target: object, prop: string | symbol, value: unknown, receiver: object) {
        const oldValue = target[prop];
        if (options?.isReadonly) return true;
        if (target[shallowSymbol]) return true;
        const result = Reflect.set(target, prop, value, receiver);
        if (target === receiver['raw']) {
            if (oldValue !== value && (!Number.isNaN(oldValue) || !Number.isNaN(value))) {
                update();
            }
        }
        return result;
    };
}

function has(target: object, key: string | symbol): boolean {
    const result = Reflect.has(target, key);
    return result;
}

function ownKeys(target: object): Array<string | symbol> {
    return Reflect.ownKeys(target);
}

function createDeleteProperty(update: Fn, options?: ProxyOptions) {
    return function deleteProperty(target: object, key: string | symbol): boolean {
        if (options?.isReadonly) return true;
        if (target[shallowSymbol]) return true;
        const hasKey = hasOwn(target, key);
        const result = Reflect.deleteProperty(target, key);
        if (result && hasKey) {
            update();
        }

        return result;
    };
}

const baseHandler = (update: Fn, options?: ProxyOptions) => {
    return {
        get: createGetter(update, options),
        set: createSetter(update, options),
        has,
        ownKeys,
        deleteProperty: createDeleteProperty(update, options),
    };
};

export default baseHandler;
