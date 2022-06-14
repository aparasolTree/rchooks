# useLocalStorage

响应式 LocalStorage

## 用法

```tsx
import React from 'react';
import { useLocalStorage } from '@rchooks/core';

const Demo: React.FC = () => {
    const [color, { write }] = useLocalStorage<string>('color', 'red');

    return (
        <div onClick={() => write(`#${Math.random()
            .toString(16)
            .slice(-6)
            .toLowerCase()}`
        )}
            style={{
            height: '100vh',
            backgroundColor: color
        }}></div>
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

const [data, { write, remove }] = useLocalStorage<T extends string | number | boolean | object | null>(
    key: string, // 存储, 获取数据的key
    value: T, // 存储的数据
    options?: UseStorageOptions<T>
): [T, {
    write: (val: T) => void;
    remove: () => void;
}]

```
