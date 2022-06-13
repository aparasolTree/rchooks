import { useMemo, useState } from 'react';
import { Cookies, CookieOptions } from '@r-hooks/shared';

interface CookieAction {
    updateCookie: (newValue: string, options?: CookieOptions) => void;
    deleteCookie: () => void;
}

export default function useCookie(cookieKey: string): [string | null, CookieAction] {
    const [cookie, setCookie] = useState<string | null>(() => Cookies.get(cookieKey) || null);

    const actions = useMemo(() => {
        return {
            deleteCookie: () => {
                Cookies.remove(cookieKey);
                setCookie(null);
            },
            updateCookie: (newValue: string, options?: CookieOptions) => {
                Cookies.set(cookieKey, newValue, options);
                setCookie(newValue);
            },
        };
    }, [cookieKey]);

    return [cookie, actions];
}
