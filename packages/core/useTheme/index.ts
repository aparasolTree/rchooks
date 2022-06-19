import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { useLatest } from '../useLatest';
import { useMediaQuery } from '../useMediaQuery';
import { LikeStorage, useStorage, UseStorageOptions } from '../useStorage';

export type BasicColorMode = 'light' | 'dark' | 'auto' | '';
export interface UseThemeOptions<T extends string = BasicColorMode>
    extends UseStorageOptions<T | BasicColorMode> {
    selector?: string;
    attribute?: string;
    modes?: Partial<Record<T | BasicColorMode, string>>;
    onChanged?: (mode?: T | BasicColorMode) => void;
    storageKey?: string;
    storage?: LikeStorage;
}

export function useTheme<T extends string = BasicColorMode>(options: UseThemeOptions<T> = {}) {
    const {
        selector = 'html',
        attribute = 'class',
        storage,
        storageKey = 'rchooks-color-mode',
        listenOnStroageChange = true,
    } = options;

    const onChangedRef = useLatest(options.onChanged);
    const preferredDark = useMediaQuery('prefers-color-scheme: dark');
    const [state, { write: setTheme }] = useStorage<T | BasicColorMode>(
        storageKey,
        'auto',
        storage,
        {
            listenOnStroageChange,
        }
    );

    const modes = useRef({
        auto: '',
        light: 'light',
        dark: 'dark',
        ...(options.modes || {}),
    } as Record<BasicColorMode | T, string>);

    const updateTheme = useCallback((selector: string, attribute: string, value: string) => {
        const el = document.querySelector(selector);
        if (!el) return;

        if (attribute === 'class') {
            const currentMode = value.split(' ');
            Object.values(modes.current)
                .flatMap((m) => (m || '').split(' '))
                .filter(Boolean)
                .forEach((m) => {
                    if (currentMode.includes(m)) {
                        el.classList.add(m);
                    } else {
                        el.classList.remove(m);
                    }
                });
        } else {
            el.setAttribute(attribute, value);
        }
    }, []);

    const theme = useMemo(
        () => (state === 'auto' ? (preferredDark ? 'dark' : modes.current['light']) : state),
        [preferredDark, state]
    ) as T | BasicColorMode;

    const defaultUpdateTheme = useCallback(
        (mode: T | BasicColorMode) => {
            updateTheme(selector, attribute, modes.current[mode] ?? mode);
        },
        [attribute, selector, updateTheme]
    );

    const onChanged = useCallback(
        (mode: BasicColorMode | T) => {
            if (onChangedRef.current) {
                onChangedRef.current(mode);
            }
            defaultUpdateTheme(mode);
        },
        [defaultUpdateTheme, onChangedRef]
    );

    useLayoutEffect(() => {
        onChanged(theme);
    }, [onChanged, theme]);

    return [theme, setTheme] as const;
}
