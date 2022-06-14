import { useCallback, useState } from 'react';

export function useSetState<T>(initialState: T | (() => T)) {
    const [state, _setState] = useState<T>(initialState);
    const setState = useCallback((newValue: Partial<T> | ((prevState: T) => Partial<T>)) => {
        _setState((prevState) =>
            Object.assign(
                {},
                prevState,
                typeof newValue === 'function' ? newValue(prevState) : newValue
            )
        );
    }, []);

    return [state, setState] as const;
}
