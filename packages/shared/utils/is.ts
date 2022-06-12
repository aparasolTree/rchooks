const { toString, hasOwnProperty } = Object.prototype;
export const getRawType = (val: unknown) => toString.call(val).slice(8, -1).toLowerCase();
export const hasOwn = (target: object, key: string | symbol): boolean =>
    hasOwnProperty.call(target, key);

export const isString = (val: unknown): val is string => getRawType(val) === 'string';
export const isNumber = (val: unknown): val is number => getRawType(val) === 'number';
export const isBoolean = (val: unknown): val is boolean => getRawType(val) === 'boolean';
export const isFunction = (val: unknown): val is Function => getRawType(val) === 'function';
export const isObject = (val: unknown): val is Object => getRawType(val) === 'object';
export const isDate = (val: unknown): val is Date => getRawType(val) === 'object';
export const isSymbol = (val: unknown): val is Symbol => getRawType(val) === 'symbol';

export const isBrowser = !!(window && window.document && window.document.createElement);
