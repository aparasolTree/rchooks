import { useState } from 'react';
import { useEventListener } from '../useEventListener';

export function useElementByPoint() {
    const [element, setElement] = useState<Element | null>(null);
    const stop = useEventListener('mousemove', (event: MouseEvent) => {
        const newElement = document.elementFromPoint(event.pageX, event.pageY);
        if (element === newElement) return;
        setElement(newElement);
    });

    return [element, stop] as const;
}
