# usePromise

简化 Promise 调用

## 用法

```tsx
import React from 'react';
import { usePromise } from '@rchooks/core';

const fetcher = () => {
    return new Promise<number>((resolve) => {
        setTimeout(() => resolve(100), 2000);
    })
}

function App() {
    const [count] = usePromise(fetcher);
    return (
        <div>
            {count && <i><b>{count}</b></i>}
        </div>
    );
}
```

## 参考

```tsx
interface UsePromiseOptions {
    onError?: (error: unknown) => void; // 错误回调
    immediate?: boolean; // 是否在组件挂载时执行
}

function usePromise<T = any>(promise: Promise<T> | (() => Promise<T>), options?: UsePromiseOptions): readonly [
    T | undefined, // 执行结果
    () => void // promise 执行函数
]
```
