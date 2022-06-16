import type { RefObject } from 'react';

export * from './is';
export * from './types';
export * from './default';

export const clamp = (curr: number, min: number, max: number) => Math.min(max, Math.max(min, curr));
export const noop = () => {};

export function isRef<T>(value: RefObject<T> | unknown): value is RefObject<T>;
export function isRef(value: any): value is RefObject<any> {
    return !!(value && value.current);
}

export function unRef<T>(ref: T | RefObject<T>): T | null {
    return isRef(ref) ? ref.current : ref;
}

export const cacheStringFunction = (fn: (str: string) => string) => {
    const cache: Record<string, string> = Object.create(null);
    return (value: string) => {
        const hit = cache[value];
        return hit || (cache[value] = fn(value));
    };
};

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export const genRangeRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + 1) + min;

export function timeout(ms: number, isThrowError: boolean = false, reason: string = 'timeout') {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (isThrowError) {
                reject(new Error(reason));
            } else {
                resolve();
            }
        }, ms);
    });
}
