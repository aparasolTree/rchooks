import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useElementHover<T extends EventTarget>(elementRef: RefObject<T>) {
    const [isHovered, setHover] = useState(false);

    useEffect(() => {
        const mouoseEnter = () => setHover(true);
        const mouoseLeave = () => setHover(false);
        const target = elementRef.current;
        if (target) {
            target.addEventListener('mouseenter', mouoseEnter);
            target.addEventListener('mouseleave', mouoseLeave);
            return () => {
                if (target) {
                    target.removeEventListener('mouseenter', mouoseEnter);
                    target.removeEventListener('mouseleave', mouoseLeave);
                }
            };
        }
        return;
    }, [elementRef]);

    return isHovered;
}
