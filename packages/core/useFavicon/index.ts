import { useCallback, useEffect, useRef } from 'react';

export function useFavicon(href: string) {
    const canIModify = useRef<boolean>(true);
    useEffect(() => {
        if (!canIModify.current) return;
        let link = document.querySelector<HTMLLinkElement>(`link[rel*="icon"]`);
        if (!link) {
            link = document.createElement('link');
            link.rel = 'shortcut icon';
            link.type = 'image/x-icon';
            link.href = href;
            document.head.append(link);
        } else {
            link.href = href;
        }
    }, [href]);

    return () => (canIModify.current = false);
}
