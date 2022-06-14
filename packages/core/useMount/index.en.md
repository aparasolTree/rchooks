# useMount

Executed after the component is mounted

## Usage

```tsx
import React, { useState } from 'react';
import { useMount } from '@r-hooks/core';

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

## Reference
```tsx
type Fn = (...args: any[]) => any;

function useMount<F extends Fn>(fn: F): void
```
