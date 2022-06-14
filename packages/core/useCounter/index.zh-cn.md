# useCounter

响应数值变化

## 用法

```tsx
import React from 'react';
import { useCounter } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, { inc, dec, set, reset }] = useCounter(0);
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => inc()}>加一</button>
            <button onClick={() => inc(2)}>加二</button>
            <button onClick={() => dec()}>减一</button>
            <button onClick={() => dec(2)}>减二</button>
            <button onClick={() => set(200)}>
                将值设置为 200
            </button>
            <button onClick={() => reset()}>重置</button>
        </div>
    );
}
```

## 参考

```tsx
export interface UseCounterOptions {
    min?: number;
    max?: number;
}

type UseCounterReturn = [number, {
    readonly inc: (offset?: number) => void;
    readonly set: (value: number) => void;
    readonly dec: (offset?: number) => void;
    readonly reset: () => void;
}];

const [count, {
    inc,
    dec,
    set,
    reset
}] = useCounter(initialValue: number, options: UseCounterOptions): UseCounterReturn;
```

### 返回值
- `count`: 修改后的值
- `inc`: 增加数值的方法 (默认为：`1`)
- `dec`: 减小数值的方法 (默认位：`1`)
- `set`: 设置数值的方法
- `reset`: 重置数值为初始值

### 参数
- `initialValue`: `count`的初始值 (默认为：`0`)
