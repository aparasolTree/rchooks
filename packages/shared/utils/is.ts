const { toString, hasOwnProperty } = Object.prototype;
export const getRawType = (val: unknown) => toString.call(val).slice(8, -1).toLowerCase();
export const hasOwn = (target: object, key: string | symbol): boolean =>
    hasOwnProperty.call(target, key);

export const isString = (val: unknown): val is string => getRawType(val) === 'string';
export const isNumber = (val: unknown): val is number => getRawType(val) === 'number';
export const isBoolean = (val: unknown): val is boolean => getRawType(val) === 'boolean';
export const isFunction = (val: unknown): val is Function => getRawType(val) === 'function';
export const isObject = (val: unknown): val is Record<any, any> => getRawType(val) === 'object';
export const isDate = (val: unknown): val is Date => getRawType(val) === 'object';
export const isSymbol = (val: unknown): val is Symbol => getRawType(val) === 'symbol';
export const isPromise = (val: unknown): val is Promise<any> =>
    isObject(val) && isFunction(val.then) && isFunction(val.catch);
export const isBrowser = !!(window && window.document && window.document.createElement);
export const isDef = (val: unknown): val is undefined => typeof val !== 'undefined';

export const isEmptyArray = (arr: unknown): boolean => Array.isArray(arr) && arr.length === 0;
export const isNullOrUndefined = (value: unknown): value is undefined | null =>
    value === null || value === undefined;
export const isEmpty = (value: unknown) => {
    if (value == null || value === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
};
