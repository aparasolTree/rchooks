import type { Size } from '@rchooks/shared';
import { isBrowser } from '@rchooks/shared';
import { useEffect, useState } from 'react';

export function useWindowSize() {
    const [size, setSize] = useState<Size>(() => {
        if (!isBrowser) return { width: 0, height: 0 };

        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    });

    useEffect(() => {
        if (!isBrowser) return;
        const updateSize = () => {
            const { innerWidth, innerHeight } = window;
            setSize((size) => {
                return size.width !== innerWidth || size !== innerHeight
                    ? { width: window.innerWidth, height: window.innerHeight }
                    : size;
            });
        };

        window.addEventListener('resize', updateSize, { passive: true });
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return size;
}
