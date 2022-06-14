# useSessionStorage

Reactive SessionStorage

## Usage

```tsx
import React from 'react';
import { useSessionStorage } from '@rchooks/core';

const Demo: React.FC = () => {
    const [session, { write }]  = useSessionStorage<string>('rchooks', 'sessionStorage');

    return (
        <div>
            <div>{session}</div>
            <button onClick={() => write('xl-gg')}>Write</button>
        </div>
    );
}
```

## 参考

```tsx
interface Seriaizer<T> {
    read: (raw: string) => T;
    write: (value: T) => string;
}

interface UseStorageOptions<T> {
    serializer?: Seriaizer<T>; // 自定义序列化方法
    onError?: (error: unknown) => void; // 执行出现错误时调用
    listenOnStroageChange?: boolean; // 监听 storage 事件
}

const [session, { write, remove }]  = useSessionStorage<T extends string | number | boolean | object | null>(
    key: string,  // 存储, 获取数据的key
    value: T,  // 存储的数据
    options?: UseStorageOptions<T>
): [T, {
    write: (val: T) => void;
    remove: () => void;
}]
```
