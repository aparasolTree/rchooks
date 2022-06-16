import { getRawType } from '../utils';

const noCopy = ['string', 'number', 'boolean', 'symbol', 'function', 'bigint'];

export function deepCopy<T>(target: T, map = new Map()) {
    if (map.get(target)) return target;
    if (noCopy.includes(getRawType(target))) return target;
    if (target instanceof Map) return new Map(target.entries());
    if (target instanceof Set) return new Set(target.values());
    if (target instanceof Date) return new Date(target.toString());
    if (target instanceof RegExp) return new RegExp(target.source, target.flags);

    const result = Array.isArray(target) ? [] : {};
    Object.entries(target).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            map.set(target, true);
            result[key] = deepCopy(value, map);
        } else {
            result[key] = value;
        }
    });

    return result;
}
