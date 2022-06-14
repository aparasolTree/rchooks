import { Fn } from '@rchooks/shared';
import { useEffect } from 'react';
import { useLatest } from '../useLatest';

export function useMount<F extends Fn>(fn: F) {
    const fnRef = useLatest(fn);
    useEffect(() => {
        fnRef.current();
    }, [fnRef]);
}
