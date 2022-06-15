import type { EffectCallback, DependencyList } from 'react';
import { useEffect } from 'react';
import { useFirstMountState } from '../useFirstMountState';

export function useUpdateEffect(effectFn: EffectCallback, deps?: DependencyList) {
    const isFirst = useFirstMountState();

    useEffect(() => {
        if (isFirst) {
            effectFn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
