# useRafFn

对每个requestAnimationFrame调用函数。具有取消和开启控制。

## 用法

```tsx
import React, { useState } from 'react';
import { useRafFn } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [isActive, {  start, cancel }] = useRafFn(() => { setCount(count + 1) });

    return (
        <div>
            <div>isActive: {isActive}</div>
            <div>{count}</div>
            <button onClick={() => start()}>Start</button>
            <button onClick={() => cancel()}>Cancel</button>
        </div>
    );
}
```

## 参考
```tsx
interface useRafFnOptions {
    immediate?: boolean; // 立即开启
}

const [isActive, {  start, cancel }] = useRafFn(fn: Fn, options?: useRafFnOptions): readonly [boolean, {
    start: () => void;
    cancel: () => void;
}]
```
