import { Fn, noop } from '@rchooks/shared';
import { RefObject, useEffect, useRef } from 'react';
import { useLatest } from '../useLatest';

export function useMutationObserver(
    target: RefObject<Element>,
    callback: MutationCallback,
    options: MutationObserverInit
) {
    const mutationRef = useRef<MutationObserver>();
    const cleanup = useRef<Fn>(noop);
    const callbackRef = useLatest(callback);
    const optionsRef = useRef(options);

    const isSuppprted = !!(window && window.MutationObserver);

    useEffect(() => {
        if (target.current && isSuppprted) {
            mutationRef.current = new MutationObserver(callbackRef.current);
            mutationRef.current.observe(target.current, optionsRef.current);
            cleanup.current = () => {
                mutationRef.current?.disconnect();
                mutationRef.current = void 0;
            };
        }
        return () => {
            cleanup.current();
        };
    }, [callbackRef, target, isSuppprted]);

    return { isSuppprted, cleanup };
}
