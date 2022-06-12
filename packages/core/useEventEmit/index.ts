import { Fn } from '@rc-hook/shared';
import { useRef } from 'react';
import { useUnmount } from '../useUnmount';
import EventEmit from './EventEmit';

export function useEventEmit<T = any>(key: string) {
    const eventEmitRef = useRef<EventEmit<T>>();
    const cache = useRef<Fn[]>([]);
    if (!eventEmitRef.current) {
        eventEmitRef.current = new EventEmit(key, cache);
    }

    useUnmount(() => {
        if (eventEmitRef.current && key) {
            for (let i = 0; i < cache.current.length; i++) {
                eventEmitRef.current.removeListener(cache.current[i]);
            }
        }
    });

    return eventEmitRef.current;
}
