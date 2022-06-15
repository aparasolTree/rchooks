import { useMemo, useState } from 'react';
import { Cookies, CookieOptions } from '@rchooks/shared';

interface CookieAction<T> {
    updateCookie: (key: T, newValue: string, options?: CookieOptions) => void;
    deleteCookie: (key?: T) => void;
}

export function useCookie<T extends string>(
    cookieKeys: T[]
): [Partial<Record<T, string>>, CookieAction<T>] {
    const [cookies, setCookies] = useState<Partial<Record<T, string>>>(
        () => Cookies.get(cookieKeys) || {}
    );

    const actions = useMemo(() => {
        return {
            deleteCookie: (key?: T) => {
                if (key) {
                    if (!cookieKeys.includes(key)) return;
                    Cookies.remove(key);
                    setCookies((prevCookies) => {
                        if (prevCookies == null || !prevCookies[key]) return prevCookies;
                        return Object.fromEntries(
                            Object.entries(prevCookies!).filter(([k]) => k !== key)
                        ) as Partial<Record<T, string>>;
                    });
                } else {
                    for (const key of cookieKeys) {
                        Cookies.remove(key);
                    }
                    setCookies({});
                }
            },
            updateCookie: (key: T, newValue: string, options?: CookieOptions) => {
                if (!cookieKeys.includes(key)) return;
                Cookies.set(key, newValue, options);
                setCookies((prevCookies) => {
                    if (prevCookies && prevCookies[key] === newValue) return prevCookies;
                    return { ...prevCookies, [key]: newValue } as Partial<Record<T, string>>;
                });
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookieKeys.join('|')]);

    return [cookies, actions];
}
