import { isFunction, isPromise, noop } from '@rchooks/shared';
import { useCallback, useState } from 'react';
import { useLatest } from '../useLatest';
import { useMount } from '../useMount';

export interface UsePromiseOptions {
    onError?: (error: unknown) => void;
    immediate?: boolean;
}

export function usePromise<T = any>(
    promise: Promise<T> | (() => Promise<T>),
    options: UsePromiseOptions = {}
) {
    const { onError = noop, immediate = true } = options;
    const [state, setState] = useState<T>();
    const promiseRef = useLatest(promise);
    const errorRef = useLatest(onError);

    const execute = useCallback(() => {
        const onResolve = (result: T) => setState(result);
        const onReject = (error: unknown) => {
            setState(undefined);
            errorRef.current(error);
        };

        if (isFunction(promiseRef.current)) {
            promiseRef.current().then(onResolve, onReject);
        } else if (isPromise(promiseRef.current)) {
            promiseRef.current.then(onResolve, onReject);
        } else {
            console.error(`[usePromise]: must be a promise or a function that returns a promise`);
        }
    }, [errorRef, promiseRef]);

    useMount(() => immediate && execute());

    return [state, execute] as const;
}
