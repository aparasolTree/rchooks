import React, { useMemo } from 'react';
import { useEventListener } from '../useEventListener';
import { useLatest } from '../useLatest';

export type KeyFilter = string[];
export type KeyHandler = (event: KeyboardEvent) => void;
export interface UseKeyOptions<T extends EventTarget> {
    event?: 'keypress' | 'keydown' | 'keyup';
    target?: React.MutableRefObject<T>;
    eventOptions?: boolean | AddEventListenerOptions;
    modifier?: ('alt' | 'ctrl' | 'shift' | 'meta')[];
}

export function useKey<T extends EventTarget>(
    keys: KeyFilter,
    fn: KeyHandler,
    options: UseKeyOptions<T> = {}
) {
    const { event = 'keydown', target, eventOptions, modifier } = options;
    const fnRef = useLatest(fn);
    const modifierRef = useLatest(modifier);

    const useMemoHandler = useMemo(() => {
        const filtered = (event: KeyboardEvent) => {
            const modifier = modifierRef.current;
            if (modifier) {
                if (modifier.some((m) => event[`${m}Key`])) {
                    if (keys.includes(event.key)) return true;
                    else return false;
                } else return false;
            } else {
                if (keys.includes(event.key)) return true;
            }
            return false;
        };

        const handler: KeyHandler = (event) => {
            if (filtered(event)) {
                return fnRef.current(event);
            }
        };

        return handler;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys.join('|')]);

    return useEventListener(target?.current ?? document, event, useMemoHandler, eventOptions);
}
