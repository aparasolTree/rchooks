import { useMemo, useRef } from 'react';
import { useUpdate } from '../useUpdate';
import { ProxyOptions, reactive } from './handler/reactive';

export function useProxy<T extends object>(initialState: T, options: ProxyOptions = {}) {
    const update = useUpdate();
    const stateRef = useRef(initialState);
    const optionsRef = useRef(options);

    return useMemo(() => {
        return reactive(stateRef.current, update, optionsRef.current);
    }, [update]);
}
