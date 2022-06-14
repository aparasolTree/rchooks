import { useState } from 'react';
import { format, IDate, TimeAgoOptions } from './utils/format';
import { register } from './utils/locales';
import { useIntervalFn } from '../useIntervalFn';
import { useMount } from '../useMount';

export * from './utils/format';
export * from './utils/locales';

export interface UseTimeAgoOptions extends TimeAgoOptions {
    updateDelay?: number;
}

export function useTimeAgo(time: IDate, options: UseTimeAgoOptions = {}) {
    const { updateDelay = 3000 } = options;
    const [timeAgo, setTimeAgo] = useState('');

    useMount(() => {
        if (options.format && options.name) {
            register(options.name, options.format);
        }
    });

    const [isActive, controls] = useIntervalFn(() => {
        setTimeAgo(format(time, options.name, options));
    }, updateDelay);

    return [timeAgo, { isActive, ...controls }] as const;
}
