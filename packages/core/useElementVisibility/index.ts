import { isBrowser } from '@rc-hook/shared';
import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from '../useEventListener';
import { useMount } from '../useMount';

export function useElementVisibility(elementRef: RefObject<Element>) {
    const [elementIsVisibility, setElementVisibility] = useState(false);
    const checkBounding = useCallback(() => {
        if (!isBrowser) return;
        if (!elementRef.current) {
            setElementVisibility(false);
        } else {
            const { top, left, bottom, right } = elementRef.current.getBoundingClientRect();
            setElementVisibility(() => {
                return (
                    top <= (window.innerHeight || document.documentElement.clientHeight) &&
                    left <= (window.innerWidth || document.documentElement.clientWidth) &&
                    bottom >= 0 &&
                    right >= 0
                );
            });
        }
    }, [elementRef]);

    useMount(() => checkBounding());
    useEventListener('scroll', checkBounding, { capture: false, passive: true });

    return elementIsVisibility;
}
