import { clamp } from '@r-hooks/shared';
import { useCallback, useState } from 'react';

export function useClamp(initialValue: number, min: number, max: number) {
    const [value, _setValue] = useState(initialValue);
    const setValue = useCallback(
        (value: number | ((prevValue: number) => number)) => {
            return _setValue((_value) => {
                return clamp(typeof value === 'function' ? value(_value) : value, min, max);
            });
        },
        [min, max]
    );

    return [value, setValue] as const;
}
