import { Fn } from '../utils';

export interface ThrottleOptions {
    immediate?: boolean;
}

export function throttle<T extends Fn>(fn: T, delay: number = 0, options: ThrottleOptions = {}) {
    let { immediate = true } = options;
    let lastExec = 0,
        timeout: ReturnType<typeof setTimeout> | null = null,
        result: ReturnType<T> | null = null;

    function throttleWrap(this: unknown, ...args: Parameters<T>) {
        const _now = Date.now();
        if (!lastExec) lastExec = _now;
        let remaining = delay - (_now - lastExec);
        if (remaining <= 0 || remaining > delay) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastExec = _now;
            result = fn.apply(this, args);
        } else if (!timeout) {
            if (immediate) {
                immediate = false;
                result = fn.apply(this, args);
            } else {
                timeout = setTimeout(() => {
                    lastExec = Date.now();
                    timeout = null;
                    result = fn.apply(this, args);
                }, delay);
            }
        }

        return result;
    }

    const clear = () => {
        timeout && clearTimeout(timeout);
        lastExec = 0;
        timeout = null;
    };

    return [throttleWrap, clear] as const;
}
