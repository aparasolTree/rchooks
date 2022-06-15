# useWebWorker

Simple Web Workers registration and communication.

## Usage

```tsx
import { useWebWorker } from '@rchooks/core';

const [data, { post, terminate }] = useWebWorker('<path>/worker.js');
```

## Reference
[web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage)
```tsx
interface useWebWorkerOptions extends WorkerOptions {
    onError?: (error: unknown) => void;
    transferable?: boolean; // Whether to transfer ownership
}

const [data, { post, terminate }] = useWebWorker<Data = any>(url: string, options?: useWebWorkerOptions): readonly [
    Data | null,
    {
        readonly Worker: React.MutableRefObject<Worker | undefined>;
        readonly post: (value: any) => void;
        readonly terminate: () => void;
    }
]
```
