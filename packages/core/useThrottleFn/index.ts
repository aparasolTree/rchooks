import { useMemo } from 'react';
import { Fn } from '@r-hooks/shared';
import { throttle, ThrottleOptions } from '@r-hooks/shared';
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
