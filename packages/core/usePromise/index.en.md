# usePromise

Simplify promise calls

## Usage

```tsx
import React from 'react';
import { usePromise } from '@rchooks/core';

const fetcher = () => {
    return new Promise<number>((resolve) => {
        setTimeout(() => resolve(100), 2000);
    })
}

function App() {
    const [count] = usePromise(fetcher);
    return (
        <div>
            {count && <i><b>{count}</b></i>}
        </div>
    );
}
```

## Reference

```tsx
interface UsePromiseOptions {
    onError?: (error: unknown) => void; // error callback
    immediate?: boolean; // Whether to execute when the component is mounted
}

function usePromise<T = any>(promise: Promise<T> | (() => Promise<T>), options?: UsePromiseOptions): readonly [
    T | undefined, // results of execute
    () => void // promise execute function
]
```
