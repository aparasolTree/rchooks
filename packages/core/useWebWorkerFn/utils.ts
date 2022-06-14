import { Fn } from '@rchooks/shared';

export const importScriptsParse = (importScripts: string[]) => {
    return `importScripts(${importScripts.map((importScript) => `'${importScript}'`).join(', ')})`;
};

export const runner = ({ fn, transferable }: { fn: Fn; transferable: boolean }) => {
    return (event: MessageEvent) => {
        const args = event.data as any[];
        return Promise.resolve(fn.apply(null, args))
            .then((result) => {
                const isTransferable = (val: any) =>
                    (ArrayBuffer && val instanceof ArrayBuffer) ||
                    (ImageBitmap && val instanceof ImageBitmap) ||
                    (MessagePort && val instanceof MessagePort);

                const transferList: any = transferable && isTransferable(result) ? [result] : [];
                // eslint-disable-next-line no-restricted-globals
                self.postMessage(['success', result], transferList);
            })
            .catch((error) => {
                // eslint-disable-next-line no-restricted-globals
                self.postMessage(['error', error]);
            });
    };
};

export const createWebWorkerBlobUrl = (fn: Fn, importScripts: string[], transferable: boolean) => {
    const code = `
        ${importScriptsParse(importScripts)}
        self.onmessage = (${runner})({
            fn: ${fn},
            transferable: ${transferable},
        });
    `;
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    return url;
};
