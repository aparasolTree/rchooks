import { Fn } from '@rchooks/shared';
import { MutableRefObject } from 'react';

const cacheEvent: Map<string, Set<Fn>> = new Map();
export default class EventEmit<T> {
    private key: string;
    private cache: MutableRefObject<Fn[]>;
    constructor(key: string, cache: MutableRefObject<Fn[]>) {
        this.key = key;
        this.cache = cache;
    }

    addListener(listener: Fn) {
        let set: Set<Fn> | undefined = cacheEvent.get(this.key);
        if (!set) {
            cacheEvent.set(this.key, (set = new Set()));
        }
        set.add(listener);
        this.cache.current.push(listener);
    }

    disPatch(args: T) {
        let set: Set<Fn> | undefined = cacheEvent.get(this.key);
        set?.forEach((fn) => fn(args));
    }

    removeListener(listener?: Fn) {
        if (listener) {
            cacheEvent.get(this.key)?.delete(listener);
            return;
        }
        cacheEvent.delete(this.key);
    }

    once(listener: Fn) {
        const once = (args: T) => {
            listener(args);
            this.removeListener(once);
        };
        this.addListener(once);
    }
}
