import { Fn, isBrowser } from '@rc-hook/shared';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLatest } from '../useLatest';
import { useUnmount } from '../useUnmount';

export interface useRafFnOptions {
    immediate?: boolean;
}

export function useRafFn(fn: Fn, options: useRafFnOptions = {}) {
    const { immediate = true } = options;

    const [isActive, setActive] = useState<boolean>(false);
    const isActiveRef = useRef(isActive);
    const fnRef = useLatest(fn);
    const timer = useRef<number | null>(null);

    const actions = useMemo(() => {
        const loop = () => {
            if (!isActiveRef.current || !isBrowser) return;
            fnRef.current();
            requestAnimationFrame(loop);
        };
        const start = () => {
            if (!isActiveRef.current && isBrowser) {
                isActiveRef.current = true;
                setActive(true);
                loop();
            }
        };
        const cancel = () => {
            setActive(false);
            isActiveRef.current = false;
            timer.current && cancelAnimationFrame(timer.current);
        };
        return { start, cancel };
    }, [fnRef]);

    useEffect(() => {
        if (immediate) {
            actions.start();
        }
    }, [immediate, actions]);

    useUnmount(() => actions.cancel());

    return [isActive, actions] as const;
}
