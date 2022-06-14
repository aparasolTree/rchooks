# useThrottleFn

限制函数的执行次数。

## 用法

```tsx
import React, { useState } from 'react';
import { useThrottleFn } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    const throttleFn = useThrottleFn(() => setCount((count) => count + 1), 500);
    return (
        <button onClick={() => throttleFn()}>{count}</button>
    );
}

```

## 参考
```tsx
interface ThrottleOptions {
    immediate?: boolean;
}

const throttleFn =useThrottleFn<T extends Fn>(
    fn: T,
    delay?: number,
    options?: ThrottleOptions
): (this: unknown, ...args: Parameters<T>) => ReturnType<T> | null
```
