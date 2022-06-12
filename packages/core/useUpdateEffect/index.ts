import type { EffectCallback, DependencyList } from 'react';
import { useEffect } from 'react';
import { useMountedState } from '../useMountedState';

export function useUpdateEffect(effectFn: EffectCallback, deps?: DependencyList) {
    const isMouted = useMountedState();

    useEffect(() => {
        if (isMouted()) {
            effectFn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
