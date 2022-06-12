import { useTimeoutFn } from '../useTimeoutFn';
import { useUpdate } from '../useUpdate';

export function useTimeout(delay: number = 1500) {
    const update = useUpdate();
    return useTimeoutFn(update, delay);
}
