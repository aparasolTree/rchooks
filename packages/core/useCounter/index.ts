import { clamp } from '@r-hooks/shared';
import { useMemo, useState } from 'react';

export interface UseCounterOptions {
    min?: number;
    max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
    const [count, setCount] = useState(initialValue);
    const { min = -Infinity, max = Infinity } = options;

    const actions = useMemo(() => {
        const inc = (offset = 1) => setCount((count) => clamp(count + offset, min, max));
        const dec = (offset = 1) => setCount((count) => clamp(count - offset, min, max));
        const set = (value: number) => setCount(value);

        return { inc, set, dec };
    }, [max, min]);

    return [
        count,
        {
            reset: () => setCount(initialValue),
            ...actions,
        },
    ] as const;
}
