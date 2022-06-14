import { isBrowser, noop } from '@rchooks/shared';
import React, { useEffect, useRef } from 'react';
import { useLatest } from '../useLatest';

export function useResizeObserver(
    target: React.RefObject<Element>,
    callback: ResizeObserverCallback,
    options: ResizeObserverOptions = {}
) {
    const { box } = options;
    const isSupported = !!(isBrowser && window.ResizeObserver);
    const resizeObserverRef = useRef<ResizeObserver>();
    const callbackRef = useLatest(callback);
    const clearObserver = useRef(noop);
    const isClear = useRef(false);

    useEffect(() => {
        if (!isSupported || !target.current || isClear.current) return;
        resizeObserverRef.current = new ResizeObserver(callbackRef.current);
        resizeObserverRef.current.observe(target.current, { box });

        clearObserver.current = () => {
            isClear.current = true;
            resizeObserverRef.current?.disconnect();
        };
        return () => {
            resizeObserverRef.current?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callbackRef, isSupported, box, target.current]);

    return [isSupported, clearObserver] as const;
}
