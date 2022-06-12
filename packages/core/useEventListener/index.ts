import { defaultWindow, Fn, isBrowser, isString, noop, unRef } from '@rc-hook/shared';
import { RefObject, useEffect, useRef } from 'react';
import { useLatest } from '../useLatest';

export interface CustomEventTarget<Name> {
    addEventListener: (event: Name, listener: (event: any) => void, options: any) => void;
    removeEventListener: (event: Name, listener: (event: any) => void, options: any) => void;
}

export function useEventListener<E extends keyof WindowEventMap>(
    event: E,
    listener: (this: Window, event: WindowEventMap[E]) => void,
    options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener<E extends keyof WindowEventMap>(
    target: Window,
    event: E,
    listener: (this: Window, event: WindowEventMap[E]) => void,
    options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener<E extends keyof DocumentEventMap>(
    target: Document,
    event: E,
    listener: (this: Document, event: DocumentEventMap[E]) => void,
    options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener<Name extends string, EventType extends Event>(
    target: CustomEventTarget<Name>,
    event: Name,
    listener: (event: EventType) => void,
    options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener<EventType = Event>(
    target: RefObject<EventTarget>,
    event: string,
    listener: (event: EventType) => void,
    options?: boolean | AddEventListenerOptions
): Fn;

export function useEventListener(...args: any[]) {
    let target: RefObject<EventTarget> | EventTarget | undefined;
    let event: string, listener: any, options: any;

    if (isString(args[0])) {
        [event, listener, options] = args;
        target = defaultWindow;
    } else {
        [target, event, listener, options] = args;
    }

    const cleanupRef = useRef(noop);
    const listenerRef = useLatest(listener);

    useEffect(() => {
        if (!isBrowser) return;
        const origin = unRef(target);
        if (!origin) return;

        const eventListener = (event: Event) => listenerRef.current(event);
        origin.addEventListener(event, eventListener, options);
        cleanupRef.current = () => {
            origin.removeEventListener(event, eventListener, options);
            cleanupRef.current = noop;
        };

        return () => {
            cleanupRef.current();
            cleanupRef.current = noop;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event, listenerRef, unRef(target), JSON.stringify(options)]);

    return cleanupRef.current;
}
