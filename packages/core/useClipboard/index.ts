import { defaultNavigator } from '@rchooks/shared';
import { useCallback, useState } from 'react';
import { useTimeoutFn } from '../useTimeoutFn';

export interface UseClipboardOptions<S> {
    delaultValue?: S;
    copiedDuring?: number;
}

export interface UseClipboardReturn<C> {
    isSupported: boolean;
    copied?: boolean;
    copy: C extends true ? (text?: string) => Promise<void> : (text: string) => Promise<void>;
    read: () => void;
}

export function useClipboard(
    options?: UseClipboardOptions<undefined>
): [string, UseClipboardReturn<true>];
export function useClipboard(
    options: UseClipboardOptions<string>
): [string, UseClipboardReturn<false>];
export function useClipboard(
    options: UseClipboardOptions<string | undefined> = {}
): [string, UseClipboardReturn<boolean>] {
    const { copiedDuring = 1600, delaultValue = '' } = options;
    const navigator = defaultNavigator;

    const isSupported = !!(navigator && navigator.clipboard);
    const [text, setText] = useState<string>(delaultValue);
    const [copied, setCopied] = useState<boolean>(false);

    const [, { start }] = useTimeoutFn(() => setCopied(false), copiedDuring);

    const copy = useCallback(
        async (value: string | undefined = delaultValue) => {
            if (isSupported && value != null) {
                await navigator.clipboard.writeText(value);
                setText(value);
                setCopied(true);
                start();
            }
        },
        [isSupported, navigator?.clipboard, delaultValue, start]
    );

    const read = useCallback(() => {
        navigator?.clipboard.readText().then((text) => {
            setText(text || '');
        });
    }, [navigator?.clipboard]);

    return [text, { copied, isSupported, copy, read }];
}
