# useTimeout

Re-renders the component after the specified number of milliseconds.

## Usage

```tsx
import React from 'react';
import { useTimeout } from '@rchooks/core';

const Demo: React.FC = () => {
    const [ isReady, { start, clear } ] = useTimeout(1000);
    return (
        <div>
            isReady: {JSON.stringify(isReady())}
            <br />
            {isReady() ? <button onClick={() => start()}>Start</button> : <button onClick={() => clear()}>Clear</button>}
        </div>
    );
}
```

## Reference
```tsx
const [ isReady, { start, clear } ] = useTimeoutFn<F extends Fn>(fn: F, delay?: number): readonly [
    () => boolean,
    {
        clear: () => void;
        start: () => void;
    }
]
```