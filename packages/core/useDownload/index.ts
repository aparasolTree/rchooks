import { useCallback, useLayoutEffect, useState } from 'react';
import { useLatest } from '../useLatest';
import { objectPick } from '@r-hooks/shared';

export interface UseDownloadOptions {
    immediate?: boolean;
    onError?: (error: unknown) => void;
    onSuccess?: (fileInfo: IFileInfo) => void;
}

export interface IFileInfo {
    url: string;
    filename: string;
    extension: string;
    hash: string;
    host: string;
    hostname: string;
    origin: string;
    pathname: string;
    protocol: string;
}

const parseFileURL = (url: string): IFileInfo => {
    const Url = new URL(url);
    const filename = url.split(/(\/|\\)/g).pop()!;
    return {
        url: url,
        filename: decodeURIComponent(filename),
        extension: filename.split('.').pop()!,
        ...objectPick(Url, ['hash', 'host', 'hostname', 'origin', 'pathname', 'protocol']),
    };
};

const dwonload = (blob: Blob, fileInfo: IFileInfo) => {
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.download = fileInfo.filename;
    anchorElement.href = url;
    document.body.append(anchorElement);
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
};

export function useDownload(url: string, options: UseDownloadOptions = {}) {
    const [totalLength, setTotalLength] = useState(0),
        [loaded, setLoaded] = useState(0),
        [fileInfo, setFileInfo] = useState<IFileInfo | null>();
    const optionsRef = useLatest(options);

    const execute = useCallback(() => {
        const promise = new Promise<[Blob, IFileInfo]>(async (resolve, reject) => {
            try {
                const response = await fetch(url);
                const fileInfo = parseFileURL(response.url);
                setFileInfo(fileInfo);
                const reader = await response.body!.getReader();

                const contentLength = Number(response.headers.get('Content-Length'));
                setTotalLength(contentLength);

                let receivedLength = 0;
                const chunks: Uint8Array[] = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    chunks.push(value);
                    receivedLength += value.length;
                    setLoaded(receivedLength);
                }

                resolve([new Blob(chunks), fileInfo]);
            } catch (error) {
                reject(error);
            }
        });

        promise
            .then(([blob, fileInfo]) => {
                dwonload(blob, fileInfo);
                optionsRef.current.onSuccess?.(fileInfo);
            })
            .catch((error) => {
                optionsRef.current.onError?.(error);
            });
    }, [optionsRef, url]);

    useLayoutEffect(() => {
        if (optionsRef.current.immediate) {
            execute();
        }
    }, [execute, optionsRef, url]);

    return { total: totalLength, fileInfo, loaded, execute };
}
