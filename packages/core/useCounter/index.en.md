# useCounter

Reactive numerical changes

## Usage

```tsx
import React from 'react';
import { useCounter } from '@r-hooks/core';

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

export default Demo;
```

## Reference

```tsx
const [count, { inc, dec, set, reset }] = useCounter(0);
```

### 返回值
- `count`: modified value
- `inc`: Method to increment the value (default: `1`)
- `dec`: Method to decrease the value (default bit: `1`)
- `set`: The method of subtracting the set value
- `reset`: reset value to initial value

### 参数
- `initialValue`: initial value of `count` (default: `0`)
