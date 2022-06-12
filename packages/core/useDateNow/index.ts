import { useState } from 'react';
import { useRafFn } from '../useRafFn';

export function useDateNow() {
    const [dateNow, setDateNow] = useState(Date.now());
    const [isActive, { start, cancel }] = useRafFn(() => setDateNow(Date.now()));

    return [dateNow, { isActive, start, cancel }] as const;
}
