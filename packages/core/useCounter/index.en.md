# useCounter

Reactive numerical changes

## Usage

```tsx
import React from 'react';
import { useCounter } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, { inc, dec, set, reset }] = useCounter(0);
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => inc()}>inc</button>
            <button onClick={() => inc(2)}>inc (+2)</button>
            <button onClick={() => dec(2)}>dec</button>
            <button onClick={() => dec(2)}>dec (-2)</button>
            <button onClick={() => set(200)}>set (200)</button>
            <button onClick={() => reset()}>reset</button>
        </div>
    );
}
```

## Reference

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
- `count`: modified value
- `inc`: Method to increment the value (default: `1`)
- `dec`: Method to decrease the value (default bit: `1`)
- `set`: The method of subtracting the set value
- `reset`: reset value to initial value

### 参数
- `initialValue`: initial value of `count` (default: `0`)
