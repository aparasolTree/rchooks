import { isBrowser } from '@rc-hook/shared';
import { useCallback, useRef } from 'react';
import { useUnmount } from '../useUnmount';

export interface UseTitleOptions {
    restoreOnUnmounted?: boolean;
    titleTempalte?: string;
}

export function useTitle(title: string, options: UseTitleOptions = {}) {
    const { restoreOnUnmounted = false, titleTempalte = '%s' } = options;
    const prevTitleRef = useRef(document.title);
    const canIChange = useRef<boolean>(true);

    if (isBrowser && document.title !== title && canIChange.current) {
        document.title = titleTempalte.replace('%s', title);
    }

    const stop = useCallback(() => {
        if (isBrowser && restoreOnUnmounted) {
            document.title = prevTitleRef.current;
        }
    }, [restoreOnUnmounted]);
    useUnmount(() => stop());

    return useCallback(() => (canIChange.current = false), []);
}
