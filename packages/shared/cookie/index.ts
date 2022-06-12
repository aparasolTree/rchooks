import { isBrowser, isDate, isNumber } from '../utils';

export interface CookieOptions {
    maxAge?: number;
    signed?: boolean;
    expires?: Date | string | number;
    httpOnly?: boolean;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
}

const ObjectKeys = <Obj>(target: Obj): (keyof Obj)[] => {
    return Object.keys(target) as (keyof Obj)[];
};

export interface UseCookieReturn {
    set: (name: string, value: string, attributes?: CookieOptions) => string;
    get: (name: string) => string;
    remove: (name: string, attributes?: CookieOptions) => string | undefined;
}

function Init(defaultAttributes: CookieOptions): UseCookieReturn {
    function setCookie(name: string, value: string, attributes: CookieOptions = {}) {
        if (!isBrowser) return;

        attributes = Object.assign({}, defaultAttributes, attributes);

        if (isNumber(attributes.expires)) {
            attributes.expires = new Date(Date.now() + attributes.expires * 846e5);
        }
        if (isDate(attributes.expires)) {
            attributes.expires = attributes.expires.toUTCString();
        }

        let stringifiedAttribute = '';
        ObjectKeys(attributes).forEach((key) => {
            if (!attributes[key]) return;
            stringifiedAttribute += '; ' + key;

            if (attributes[key] === true) return;
            stringifiedAttribute += '=' + attributes[key];
        });

        return (document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
            value
        )}${stringifiedAttribute}`);
    }

    function getCookie(name: string) {
        if (!isBrowser || !name) return;

        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const result: Record<string, string> = {};
        for (const cookie of cookies) {
            const [key, value] = cookie.split('=');
            try {
                const found = decodeURIComponent(key);
                result[found] = decodeURIComponent(value);
                if (name === found) break;
            } catch (error) {}
        }

        return name ? result[name] : result;
    }

    return Object.create({
        set: setCookie,
        get: getCookie,
        remove: (name: string, attributes: CookieOptions = {}) => {
            return setCookie(name, '', Object.assign({}, attributes, { expires: -1 }));
        },
    });
}

export const Cookies = Init({ path: '/' });
