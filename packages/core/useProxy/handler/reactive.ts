import { Fn, getRawType } from '@r-hooks/shared';
import baseHandler from './baseHandler';
import { collectionHandler } from './collectionHandler';

export interface ProxyOptions {
    isReadonly?: boolean;
    isShadow?: boolean;
}

const reactiveMap = new Map();

enum TargetType {
    INVALID = 'invalid',
    COMMON = 'common',
    COLLECTION = 'collection',
}

function targetTypeMap(rawType: string) {
    switch (rawType) {
        case 'object':
        case 'array':
            return TargetType.COMMON;
        case 'map':
        case 'set':
        case 'weakmap':
        case 'weakset':
            return TargetType.COLLECTION;
        default:
            return TargetType.INVALID;
    }
}

function getTargetType(target: object) {
    return !Object.isExtensible(target) ? TargetType.INVALID : targetTypeMap(getRawType(target));
}

function createReactive(source: object, update: Fn, options?: ProxyOptions) {
    const targetType = getTargetType(source);
    if (targetType === TargetType.INVALID) {
        return source;
    }

    return new Proxy(
        source,
        targetType === TargetType.COLLECTION
            ? collectionHandler(update, options)
            : baseHandler(update, options)
    );
}

export function reactive<T extends object>(source: T, update: Fn, options?: ProxyOptions): T {
    const existionProxy = reactiveMap.get(source);
    if (existionProxy) return existionProxy;

    const proxy = createReactive(source, update, options);
    reactiveMap.set(source, proxy);
    return proxy as T;
}
