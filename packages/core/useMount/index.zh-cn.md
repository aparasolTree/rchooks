# useMount

在组件挂载完成后执行

## 用法

```tsx
import React, { useState } from 'react';
import { useMount } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    useMount(() => {
        console.log(count);
    });
    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

## 参考
```tsx
type Fn = (...args: any[]) => any;

function useMount<F extends Fn>(fn: F): void
```
