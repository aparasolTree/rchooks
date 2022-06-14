# useRafFn

The function is called for each requestAnimationFrame. Has cancel and start controls.

## Usage

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

## Reference
```tsx
interface useRafFnOptions {
    immediate?: boolean;
}

const [isActive, {  start, cancel }] = useRafFn(fn: Fn, options?: useRafFnOptions): readonly [boolean, {
    start: () => void;
    cancel: () => void;
}]
```
