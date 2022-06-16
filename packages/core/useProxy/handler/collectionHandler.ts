import { deepCopy, Fn } from '@rchooks/shared';
import { ProxyOptions, reactive } from './reactive';

export type CollectionType = InterableCollections | WeakCollection;
type WeakCollection = WeakMap<any, any> | WeakSet<any>;
type InterableCollections = Map<any, any> | Set<any>;

type MapTypes = Map<any, any> | WeakMap<any, any>;
type SetTypes = Set<any> | WeakSet<any>;

const toRaw = <T>(target: T): T => {
    const raw = target && (target as any).raw;
    return raw ? toRaw(raw) : target;
};

const wrap = (value: unknown, update: Fn, options?: ProxyOptions) =>
    typeof value === 'object' && value !== null ? reactive(value, update, options) : value;

function collectionProxy(update: Fn, options?: ProxyOptions) {
    return {
        add(this: SetTypes, value: unknown) {
            value = toRaw(value);
            if (options?.isReadonly) return;
            const target = toRaw(this);
            const result = target.add(value);
            return result;
        },
        delete(this: CollectionType, key: unknown) {
            key = toRaw(key);
            if (options?.isReadonly) return;
            const target = toRaw(this);
            const hasKey = target.has(key);
            const result = target.delete(key);
            if (hasKey) {
                update();
            }
            return result;
        },
        get(this: MapTypes, key: unknown) {
            key = toRaw(key);
            const target = toRaw(this);
            const hasKey = target.has(key);
            if (hasKey) {
                const result = target.get(key);
                if (typeof result === 'object' && result !== null) {
                    return options?.isShallow
                        ? deepCopy(result)
                        : reactive(result, update, options);
                } else {
                    return result;
                }
            }
        },
        set(this: MapTypes, key: unknown, value: unknown) {
            key = toRaw(key);
            value = toRaw(value);
            if (options?.isReadonly) return false;
            const target = toRaw(this);
            const oldValue = target.get(key);
            const hasKey = target.has(key);
            target.set(key, value);
            if (!hasKey) {
                update();
            } else if (oldValue !== value && (!Number.isNaN(value) || !Number.isNaN(oldValue))) {
                update();
            }
            return true;
        },
        forEach(this: InterableCollections, callback: Function, thisArg?: unknown) {
            const target = toRaw(this);
            target.forEach((value, key) => {
                callback.call(thisArg, wrap(value, update), wrap(key, update), this);
            });
        },
        [Symbol.iterator]: createIteratorMethod('entries', update),
        entries: createIteratorMethod('entries', update),
        values: createIteratorMethod('values', update),
        keys: createIteratorMethod('keys', update),
    };
}

function createIteratorMethod(method: string, update: Fn) {
    return function iteratorMethod(this: InterableCollections) {
        const target = toRaw(this);
        const iter = method === 'entires' ? target[Symbol.iterator]() : target[method]();
        return {
            next() {
                const { value, done } = iter.next();
                return {
                    value: wrap(value, update),
                    done,
                };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    };
}

export function collectionHandler(update: Fn, options?: ProxyOptions) {
    return {
        get(target: CollectionType, prop: string | symbol) {
            if (prop === 'raw') return target;
            if (prop === 'size') return Reflect.get(target, prop, target);
            return collectionProxy(update, options)[prop];
        },
    };
}
