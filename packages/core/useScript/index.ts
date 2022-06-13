import { isBrowser, noop } from '@r-hooks/shared';
import { useCallback, useRef } from 'react';
import { useLatest } from '../useLatest';

export interface UseScriptOptions {
    defer?: boolean;
    async?: boolean;
    type?: string;
    timeout?: number;
    crossOrigin?: 'anonymous' | 'use-credentils';
    referrerPolicy?:
        | 'no-referrer'
        | 'no-referrer-when-downgrade'
        | 'origin'
        | 'origin-when-cross-origin'
        | 'same-origin'
        | 'strict-origin'
        | 'strict-origin-when-cross-origin'
        | 'unsafe-url';
    noModule?: boolean;
    attrs?: Record<string, string>;
}

export function useScript(src: string, options: UseScriptOptions = {}) {
    const optionsRef = useLatest(options);
    const promise = useRef<{
        resolve: (value: HTMLScriptElement) => void;
        reject: (reason: [Error, 'Error' | 'Abort']) => void;
    }>({ reject: noop, resolve: noop });

    const loadScript = useCallback(() => {
        const {
            type = 'text/javascript',
            async = true,
            crossOrigin,
            referrerPolicy,
            noModule,
            defer,
            attrs = {},
        } = optionsRef.current;

        return new Promise<HTMLScriptElement>((resolve, reject) => {
            let shouldAppend = true;
            promise.current = { resolve, reject };
            let script = document.querySelector<HTMLScriptElement>(`script[src='${src}']`);
            if (!script) {
                script = document.createElement('script');
                script.type = type;
                script.async = async;
                script.src = src;

                if (defer) script.defer = defer;
                if (crossOrigin) script.crossOrigin = crossOrigin;
                if (noModule) script.noModule = noModule;
                if (referrerPolicy) script.referrerPolicy = referrerPolicy;
                Object.entries(attrs).forEach(([key, value]) => {
                    script!.setAttribute(key, value);
                });

                script.addEventListener('error', (event) => reject([event, 'Error']));
                script.addEventListener('abort', (event) => reject([event, 'Abort']));
                script.addEventListener('load', () => {
                    script!.setAttribute('data-status', 'loaded');
                    resolve(script!);
                });
                shouldAppend = true;
            } else if (script.getAttribute('data-status') === 'loaded') {
                resolve(script);
            }

            if (shouldAppend) {
                document.head.append(script);
            }
        });
    }, [src, optionsRef]);

    const unload = useCallback(() => {
        if (!isBrowser) return;
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            document.head.removeChild(script);
            promise.current.reject([new Error('remove script'), 'Error']);
        }
    }, [src]);

    return [loadScript, unload] as const;
}
