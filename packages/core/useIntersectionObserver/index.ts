import { RefObject, useEffect, useRef } from 'react';
import { isBrowser, noop, unRef } from '@rchooks/shared';
import { useLatest } from '../useLatest';

export function useIntersectionObserver(
    target: RefObject<Element>,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    const isSuppported = !!(window && window.IntersectionObserver);
    const interaectionRef = useRef<IntersectionObserver>();
    const cleanup = useRef(noop);
    const callbackRef = useLatest(callback);
    const optionsRef = useRef(options);

    useEffect(() => {
        if (isBrowser && isSuppported && target.current) {
            interaectionRef.current = new IntersectionObserver(
                callbackRef.current,
                optionsRef.current
            );
            interaectionRef.current.observe(target.current);
            cleanup.current = () => {
                interaectionRef.current?.disconnect();
                interaectionRef.current = void 0;
                cleanup.current = noop;
            };
        }
        return () => {
            cleanup.current();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuppported, unRef(target), unRef(options?.root)]);

    return { isSuppported, cleanup: cleanup.current };
}
