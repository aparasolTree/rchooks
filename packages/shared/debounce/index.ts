import { Fn } from '../utils';

export interface DebounceOptions {
    immediate?: boolean;
    immediateCallback?: boolean;
}

export function debounce<F extends Fn>(fn: F, ms: number = 0, options: DebounceOptions = {}) {
    let { immediate = false, immediateCallback = false } = options;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    function debounceWrap(this: unknown, ...args: Parameters<F>) {
        if (timeoutId) clearTimeout(timeoutId);
        if (ms < 0) {
            return fn.apply(null, args);
        }

        if (immediate) {
            immediate = false;
            return fn.apply(null, args);
        } else {
            timeoutId = setTimeout(() => {
                if (immediateCallback) {
                    !immediate && (immediate = true);
                }
                return fn.apply(this, args);
            }, ms);
        }
    }

    const clear = () => timeoutId && clearTimeout(timeoutId);

    return [debounceWrap, clear] as const;
}
