import { Position } from '@rc-hook/shared';
import { useState } from 'react';
import { useRafFn } from '../useRafFn';

export function useElementByPoint(position: Required<Position>) {
    const [element, setElement] = useState<Element | null>(null);
    const [isActive, { start, cancel }] = useRafFn(() => {
        const newElement = document.elementFromPoint(position.x, position.y);
        if (element === newElement) return;
        setElement(newElement);
    });

    return [element, { isActive, start, cancel }] as const;
}
