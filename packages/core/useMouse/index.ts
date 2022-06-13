import type { Position } from '@r-hooks/shared';
import { useState } from 'react';
import { useEventListener } from '../useEventListener';

export interface UseMouseOptions {
    initialPosition?: Position;
    type?: 'page' | 'client';
}

export function useMouse(options: UseMouseOptions = {}) {
    const { initialPosition = { x: 0, y: 0 }, type = 'page' } = options;
    const [position, setPosition] = useState<Position>(initialPosition);

    useEventListener(
        'mousemove',
        (event: MouseEvent) => {
            const x = type === 'page' ? event.pageX : event.clientX;
            const y = type === 'page' ? event.pageY : event.clientY;
            setPosition({ x, y });
        },
        { passive: true }
    );

    return position;
}
