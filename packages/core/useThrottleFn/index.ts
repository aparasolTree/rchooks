import { useMemo } from 'react';
import { Fn } from '@rc-hook/shared';
import { throttle, ThrottleOptions } from '@rc-hook/shared';
import { useLatest } from '../useLatest';
import { useUnmount } from '../useUnmount';

export function useThrottleFn<T extends Fn>(
    fn: T,
    delay: number = 0,
    options: ThrottleOptions = {}
) {
    const { immediate = true } = options;
    const fnRef = useLatest(fn);
    const [throttleWrap, clear] = useMemo(
        () => throttle<T>(fnRef.current, delay, { immediate }),
        [fnRef, delay, immediate]
    );

    useUnmount(() => clear());

    return throttleWrap;
}
