import { useEffect, useMemo, useRef, useState } from 'react';
import { isBrowser } from '@rchooks/shared';
import { useLatest } from '../useLatest';

export interface useWebWorkerOptions extends WorkerOptions {
    onError?: (error: unknown) => void;
    transferable?: boolean;
}

export function useWebWorker<Data = any>(url: string, options: useWebWorkerOptions = {}) {
    const [data, setData] = useState<Data | null>(null);
    const optionsRef = useLatest(options);

    const webWorkerRef = useRef<Worker>();
    const actions = useMemo(() => {
        const post = (value: any) => {
            const { transferable } = optionsRef.current;
            if (webWorkerRef.current) {
                const transferList: any[] =
                    transferable &&
                    ((value instanceof ArrayBuffer && window.ArrayBuffer) ||
                        (value instanceof MessagePort && window.MessagePort) ||
                        (value instanceof ImageBitmap && window.ImageBitmap))
                        ? [value]
                        : [];
                webWorkerRef.current.postMessage(value, [...transferList]);
            }
        };
        const terminate = () => {
            if (webWorkerRef.current) {
                webWorkerRef.current.terminate();
            }
        };

        return { post, terminate };
    }, [optionsRef]);

    useEffect(() => {
        if (isBrowser) {
            const { onError, ...options } = optionsRef.current;
            webWorkerRef.current = new Worker(url, options);
            webWorkerRef.current.onmessage = (event: MessageEvent) => {
                setData(event.data);
            };
            webWorkerRef.current.onerror = (error: ErrorEvent) => {
                onError?.(error);
            };
        }

        return () => {
            webWorkerRef.current?.terminate();
        };
    }, [optionsRef, url, webWorkerRef]);

    return [data, { ...actions, Worker: webWorkerRef }] as const;
}
