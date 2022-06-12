import { useMemo, useState } from 'react';
import { Cookies, CookieOptions } from '@rc-hook/shared';

interface CookieAction {
    updateCookie: (newValue: string, options?: CookieOptions) => void;
    deleteCookie: () => void;
}

export default function useCookie(cookieName: string): [string | null, CookieAction] {
    const [cookie, setCookie] = useState<string | null>(() => Cookies.get(cookieName) || null);

    const actions = useMemo(() => {
        return {
            deleteCookie: () => {
                Cookies.remove(cookieName);
                setCookie(null);
            },
            updateCookie: (newValue: string, options?: CookieOptions) => {
                Cookies.set(cookieName, newValue, options);
                setCookie(newValue);
            },
        };
    }, [cookieName]);

    return [cookie, actions];
}
