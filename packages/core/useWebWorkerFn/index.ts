import { useCallback, useRef, useState } from 'react';
import { useLatest } from '../useLatest';
import { useUnmount } from '../useUnmount';
import { createWebWorkerBlobUrl } from './utils';

export interface UseWebWorkerFnOptions {
    timeout?: number;
    importScripts?: string[];
    autoTermiate?: boolean;
    transferable?: boolean;
}

export enum UseWebWorkerFnStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    RUNNING = 'running',
    PENDING = 'pending',
    TIMEOUT = 'timeout',
}

export function useWebWorkerFn<T extends (...args: any[]) => any>(
    fn: T,
    options: UseWebWorkerFnOptions = {}
) {
    const { autoTermiate = true, importScripts = [], timeout, transferable = true } = options;
    const [status, setStatus] = useState(UseWebWorkerFnStatus.PENDING);
    const isRunning = useRef<boolean>();
    const workerRef = useRef<Worker & { _url?: string }>();
    const promise = useRef<{
        reject?: (result: ReturnType<T> | ErrorEvent) => void;
        resolve?: (result: ReturnType<T>) => void;
    }>({});
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();
    const fnRef = useLatest(fn);

    const setWebWorkerStatus = useCallback((status: UseWebWorkerFnStatus) => {
        isRunning.current = status === UseWebWorkerFnStatus.RUNNING;
        setStatus(status);
    }, []);

    const terminate = useCallback(() => {
        if (workerRef.current?._url) {
            workerRef.current.terminate();
            URL.revokeObjectURL(workerRef.current._url);
            promise.current = {};
            workerRef.current = void 0;
            timeoutId.current && clearTimeout(timeoutId.current);
        }
    }, []);

    const onWorkerEnd = useCallback(
        (status: UseWebWorkerFnStatus) => {
            if (autoTermiate) {
                terminate();
            }
            setWebWorkerStatus(status);
        },
        [autoTermiate, setWebWorkerStatus, terminate]
    );

    const createWebWorker = useCallback(() => {
        const blobUrl = createWebWorkerBlobUrl(fnRef.current, importScripts, transferable);
        const webWorker: Worker & { _url?: string } = new Worker(blobUrl);
        webWorker._url = blobUrl;

        webWorker.onmessage = (event: MessageEvent) => {
            const { resolve = () => {}, reject = () => {} } = promise.current;
            const [status, result] = event.data as [UseWebWorkerFnStatus, ReturnType<T>];
            switch (status) {
                case 'success':
                    resolve(result);
                    onWorkerEnd(UseWebWorkerFnStatus.SUCCESS);
                    break;
                default:
                    reject(result);
                    onWorkerEnd(UseWebWorkerFnStatus.ERROR);
                    break;
            }
        };

        webWorker.onerror = (event: ErrorEvent) => {
            const { reject = () => {} } = promise.current;
            reject(event);
            onWorkerEnd(UseWebWorkerFnStatus.ERROR);
        };

        if (timeout) {
            timeoutId.current = setTimeout(() => {
                terminate();
                setWebWorkerStatus(UseWebWorkerFnStatus.TIMEOUT);
            }, timeout);
        }

        return webWorker;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(importScripts), onWorkerEnd, transferable]);

    const callWorker = useCallback(
        (...args: Parameters<T>) => {
            return new Promise<ReturnType<T>>((resolve, reject) => {
                promise.current = { reject, resolve };
                const transferList: any[] = transferable
                    ? args.filter((val: any) => {
                          return (
                              (window.ArrayBuffer && val instanceof ArrayBuffer) ||
                              (window.ImageBitmap && val instanceof ImageBitmap) ||
                              (window.MessagePort && val instanceof MessagePort)
                          );
                      })
                    : [];
                workerRef.current && workerRef.current.postMessage([...args], transferList);
                setWebWorkerStatus(UseWebWorkerFnStatus.RUNNING);
            });
        },
        [setWebWorkerStatus, transferable]
    );

    const workerHook = useCallback(
        (...args: Parameters<T>) => {
            if (isRunning.current) {
                console.error(
                    `[useWebWorkerFn]: You can only run on instance of ths worker at a time`
                );
                return Promise.reject();
            }
            workerRef.current = createWebWorker();
            return callWorker(...args);
        },
        [callWorker, createWebWorker]
    );

    useUnmount(() => {
        terminate();
    });

    return [workerHook, { status, terminate }] as const;
}
