import { Fn, isBrowser } from '@rc-hook/shared';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLatest } from '../useLatest';

export interface UseIntervalFnOptions {
    immediate?: boolean;
    immediateCallback?: boolean;
}

export function useIntervalFn(fn: Fn, delay: number, options: UseIntervalFnOptions = {}) {
    const { immediate = true, immediateCallback = true } = options;
    const timerId = useRef<ReturnType<typeof setInterval> | null>();
    const [isActive, setActive] = useState<boolean>(false);
    const fnRef = useLatest(fn);

    const actions = useMemo(() => {
        const clear = () => {
            setActive(false);
            if (timerId.current) {
                clearInterval(timerId.current);
                timerId.current = null;
            }
        };

        const resume = () => {
            clear();
            start();
        };

        const start = () => {
            if (delay < 0) return;
            setActive(true);
            if (immediateCallback) fnRef.current();
            timerId.current = setInterval(() => fnRef.current(), delay);
        };
        return { clear, resume, start };
    }, [delay, immediateCallback, fnRef]);

    useEffect(() => {
        if (immediate && isBrowser) actions.resume();
        return () => {
            actions.clear();
        };
    }, [immediate, actions, delay]);

    return [isActive, actions] as const;
}
