import { Fn } from '@rchooks/shared';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLatest } from '../useLatest';

export function useTimeoutFn<F extends Fn>(fn: F, delay: number = 1500) {
    const ready = useRef<boolean>(false);
    const timerId = useRef<ReturnType<typeof setTimeout>>();
    const fnRef = useLatest(fn);
    const isReady = useCallback(() => ready.current, []);

    const actions = useMemo(() => {
        const clear = () => {
            ready.current = true;
            timerId.current && clearTimeout(timerId.current);
        };

        const start = () => {
            if (delay < 0) return;
            ready.current = false;
            timerId.current && clearTimeout(timerId.current);
            timerId.current = setTimeout(() => {
                ready.current = true;
                fnRef.current();
            }, delay);
        };
        return { clear, start };
    }, [delay, fnRef]);

    useEffect(() => {
        actions.start();
        return actions.clear;
    }, [delay, actions]);

    return [isReady, actions] as const;
}
