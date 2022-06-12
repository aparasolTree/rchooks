import type { UseIntervalFnOptions } from '../useIntervalFn';
import { useIntervalFn } from '../useIntervalFn';
import { useUpdate } from '../useUpdate';

export function useInterval(delay: number, options: UseIntervalFnOptions = {}) {
    const forceUpdate = useUpdate();
    return useIntervalFn(forceUpdate, delay, options);
}
