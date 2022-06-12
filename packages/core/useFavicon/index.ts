import { useEffect, useState } from 'react';

export function useFavicon(initialHref: string) {
    const [linkHref, setLinkHref] = useState<string>(initialHref);
    useEffect(() => {
        let link = document.querySelector<HTMLLinkElement>(`link[rel*="icon"]`);
        if (!link) {
            link = document.createElement('link');
            link.rel = 'shortcut icon';
            link.type = 'image/x-icon';
            link.href = linkHref;
            document.head.append(link);
        } else {
            link.href = linkHref;
        }
    }, [linkHref]);

    return setLinkHref;
}
