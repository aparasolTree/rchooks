import { RefObject, useCallback, useEffect } from 'react';
import { useResizeObserver } from '../useResizeObserver';
import { useSetState } from '../useSetState';

export interface Bounding {
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
}

export interface UseElementBoundingOptions {
    reset?: boolean;
    windowResize?: boolean;
    windowScroll?: boolean;
}

const defaultBounding: Bounding = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    x: 0,
    y: 0,
};

export function useElementBounding(
    target: RefObject<Element>,
    options: UseElementBoundingOptions = {}
) {
    const { reset = true, windowResize = true, windowScroll = true } = options;
    const [bounding, setBounding] = useSetState<Bounding>(defaultBounding);

    const update = useCallback(() => {
        const el = target.current;
        if (!el) {
            if (reset) {
                setBounding(defaultBounding);
            }
            return;
        }

        const { width, height, x, y, left, top, right, bottom } = el.getBoundingClientRect();
        setBounding({ width, height, x, y, left, right, top, bottom });
    }, [reset, setBounding, target]);

    useResizeObserver(target, update);

    useEffect(() => {
        if (windowResize) {
            window.addEventListener('resize', update, { passive: true });
        }
        if (windowScroll) {
            window.addEventListener('scroll', update, { passive: true });
        }

        return () => {
            if (windowResize) {
                window.removeEventListener('resize', update);
            }
            if (windowScroll) {
                window.removeEventListener('scroll', update);
            }
        };
    }, [update, windowResize, windowScroll]);

    return bounding;
}
