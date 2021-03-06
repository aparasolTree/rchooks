import { RefObject, useState } from 'react';
import type { Size } from '@rchooks/shared';
import { useResizeObserver } from '../useResizeObserver';

export function useElementSize(
    target: RefObject<Element>,
    initialSize: Size = { width: 0, height: 0 },
    options: ResizeObserverOptions = {}
) {
    const [size, setSize] = useState<Size>(initialSize);

    useResizeObserver(
        target,
        ([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        },
        options
    );

    return size;
}
