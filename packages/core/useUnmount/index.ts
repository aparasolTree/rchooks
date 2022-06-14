import { Fn } from '@rchooks/shared';
import { useEffect } from 'react';
import { useLatest } from '../useLatest';

export function useUnmount(fn: Fn) {
    const fnRef = useLatest(fn);
    useEffect(() => () => fnRef.current(), []);
}
