# useThrottleFn

Limit the number of times a function can be executed.

## Usage

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

## Reference
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
