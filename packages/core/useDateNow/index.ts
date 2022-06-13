import { useState } from 'react';
import { useRafFn } from '../useRafFn';

export function useDateNow(options: { immediate?: boolean } = {}) {
    const [dateNow, setDateNow] = useState(Date.now());
    const [isActive, { start, cancel }] = useRafFn(() => setDateNow(Date.now()), options);

    return [dateNow, { isActive, start, cancel }] as const;
}
