import { isBrowser } from '@r-hooks/shared';
import { useState } from 'react';
import { useUpdateEffect } from '../useUpdateEffect';

const getInitialState = (query: string, defaultState?: boolean) => {
    if (defaultState !== undefined) return defaultState;
    if (isBrowser) return window.matchMedia(query).matches;
    return false;
};

export function useMediaQuery(query: string, defaultState?: boolean) {
    const [matches, setMatches] = useState(getInitialState(query, defaultState));

    useUpdateEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const listener = () => setMatches(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', listener);
        } else mediaQuery.addListener(listener);

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', listener);
            } else mediaQuery.removeListener(listener);
        };
    }, [query]);

    return matches;
}
