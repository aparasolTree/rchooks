import { Fn } from '@rc-hook/shared';
import { useEffect, useMemo, useRef } from 'react';
import { useLatest } from '../useLatest';

export function useTimeoutFn<F extends Fn>(fn: F, delay: number = 1500) {
    const isReady = useRef<boolean>(false);
    const timerId = useRef<ReturnType<typeof setTimeout>>();
    const fnRef = useLatest(fn);

    const actions = useMemo(() => {
        const resume = () => {
            clear();
            start();
        };

        const clear = () => {
            isReady.current = true;
            timerId.current && clearTimeout(timerId.current);
        };

        const start = () => {
            if (delay < 0) return;
            isReady.current = false;
            timerId.current = setTimeout(() => {
                isReady.current = true;
                fnRef.current();
            }, delay);
        };
        return { resume, clear, start };
    }, [delay, fnRef]);

    useEffect(() => {
        actions.start();
        return actions.clear;
    }, [delay, actions]);

    return [isReady.current, actions] as const;
}
