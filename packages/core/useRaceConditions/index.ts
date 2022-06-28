import React, { useEffect } from 'react';
import type { Fn } from '@rchooks/shared';
import { useLatest } from '../useLatest';

export function useRaceConditions(
    featcher: (isCancel: () => boolean) => Fn | void,
    deps?: React.DependencyList
) {
    const fetcherRef = useLatest(featcher);
    useEffect(() => {
        let isCancel = false;
        const clearEffectFn = fetcherRef.current(() => isCancel);
        return () => {
            isCancel = true;
            clearEffectFn?.();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
