import { noop } from '@rchooks/shared';
import type { RefObject } from 'react';
import { useDebounceFn } from '../useDebounceFn';
import { useEventListener } from '../useEventListener';
import { useSetState } from '../useSetState';
import { useThrottleFn } from '../useThrottleFn';

export interface UseElementScrollOptions {
    throttleDelay?: number;
    onScroll?: (offset: ScrollOffset) => void;
    onScrollEnd?: (offset: ScrollOffset) => void;
    idle?: number;
    eventOptions?: boolean | AddEventListenerOptions;
}

export interface ScrollOffset {
    left?: number;
    bottom?: number;
    top?: number;
    right?: number;
    x?: number;
    y?: number;
}

export function useElementScroll(
    eleRef: RefObject<Element>,
    options: UseElementScrollOptions = {}
) {
    const {
        throttleDelay = 60,
        onScroll = noop,
        onScrollEnd = noop,
        idle = 200,
        eventOptions,
    } = options;

    const [scrollOffset, setScrollOffset] = useSetState<ScrollOffset>({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
    });

    const debounceScrollEnd = useDebounceFn(
        (offset: ScrollOffset) => {
            onScrollEnd(offset);
        },
        throttleDelay + idle,
        { immediate: false, immediateCallback: false }
    );

    const throttle = useThrottleFn((event: Event) => {
        const target = event.target as HTMLElement;
        const { scrollHeight, scrollLeft, scrollTop, scrollWidth, clientHeight, clientWidth } =
            target;

        const offset = {
            x: scrollLeft,
            y: scrollTop,
            top: scrollTop,
            left: scrollLeft,
            bottom: scrollHeight - (scrollTop + clientHeight),
            right: scrollWidth - (scrollLeft + clientWidth),
        };

        setScrollOffset(() => offset);
        onScroll(offset);
        debounceScrollEnd(offset);
    }, throttleDelay);

    const stop = useEventListener(eleRef, 'scroll', throttle, eventOptions);

    return [scrollOffset, { stop }] as const;
}
