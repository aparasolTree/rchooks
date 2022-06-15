import { useEffect, useState } from 'react';
import { isBrowser } from '@rchooks/shared';

export interface Offset {
    x?: number;
    y?: number;
}

export function useWindowScroll() {
    const [scrollOffset, setScrollOffset] = useState<Offset>(() => {
        if (!isBrowser) return { x: 0, y: 0 };
        return {
            x: window.scrollX,
            y: window.scrollY,
        };
    });

    useEffect(() => {
        if (!isBrowser) return;
        const handler = () => {
            setScrollOffset((scrollOffset) => {
                const { scrollX, scrollY } = window;
                return scrollOffset.x !== scrollX || scrollOffset.y !== scrollY
                    ? { x: scrollX, y: scrollY }
                    : scrollOffset;
            });
        };

        window.addEventListener('scroll', handler, { passive: true, capture: false });
        return () => {
            window.removeEventListener('scroll', handler);
        };
    }, []);

    return scrollOffset;
}
