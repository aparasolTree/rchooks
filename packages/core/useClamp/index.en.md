# useClamp

Limit the range of modified values

## Usage

```tsx
import React from 'react';
import { useClamp } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useClamp(0, 0, 1000); // Varies between 0 - 1000
    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

## Reference
```tsx
const [count, setCount] = useClamp(current: number, min: number, max: number);
```
