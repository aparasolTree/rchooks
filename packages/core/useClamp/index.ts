import { clamp } from '@rc-hook/shared';
import { useCallback } from 'react';

export function useClamp(min: number, max: number) {
    return useCallback(
        (value: number) => {
            return clamp(value, min, max);
        },
        [min, max]
    );
}
