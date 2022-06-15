# useWebWorker

简单的 Web Workers 注册和通信。

## 使用

```tsx
import { useWebWorker } from '@rchooks/core';

const [data, { post, terminate }] = useWebWorker('<path>/worker.js');
```

## 参考
[web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage)
```tsx
interface useWebWorkerOptions extends WorkerOptions {
    onError?: (error: unknown) => void;
    transferable?: boolean; // 一个可选的 Transferable 对象的数组，用于传递所有权
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
