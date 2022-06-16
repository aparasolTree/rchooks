import { getRawType } from '../utils';

const noCopy = ['string', 'number', 'boolean', 'symbol', 'function', 'bigint'];

export function deepCopy<T>(target: T, map = new Map()): T {
    if (map.get(target)) return target;
    if (noCopy.includes(getRawType(target))) return target;
    if (target instanceof Map)
        return new Map(
            Array.from(target.entries()).map(([key, val]) => [key, deepCopy(val)])
        ) as any;
    if (target instanceof Set)
        return new Set(Array.from(target.values()).map((v) => deepCopy(v))) as any;
    if (target instanceof Date) return new Date(target.toString()) as any;
    if (target instanceof RegExp) return new RegExp(target.source, target.flags) as any;

    const result = Array.isArray(target) ? [] : {};
    Object.entries(target).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            map.set(target, true);
            result[key] = deepCopy(value, map);
        } else {
            result[key] = value;
        }
    });

    return result as T;
}
