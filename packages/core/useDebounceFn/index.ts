import { useMemo } from 'react';
import { debounce, DebounceOptions, Fn } from '@rchooks/shared';
import { useLatest } from '../useLatest';
import { useUnmount } from '../useUnmount';

export function useDebounceFn<T extends Fn>(fn: T, ms: number, options: DebounceOptions = {}) {
    const { immediate = true, immediateCallback = true } = options;
    const fnRef = useLatest(fn);
    const [debounceWrap, clear] = useMemo(
        () => debounce<T>(fnRef.current, ms, { immediate, immediateCallback }),
        [ms, immediate, fnRef, immediateCallback]
    );

    useUnmount(() => clear());

    return debounceWrap;
}
