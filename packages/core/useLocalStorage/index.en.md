# useLocalStorage

Use LocalStorage to store data

## Usage

```tsx
import React from 'react';
import { useLocalStorage } from '@rchooks/core';

const Demo: React.FC = () => {
    const [color, { write }] = useLocalStorage<string>('color', 'red');

    return (
        <div onClick={() => write(`#${Math.random()
            .toString(16)
            .slice(-6)
            .toLowerCase()}`
        )}
            style={{
            height: '100vh',
            backgroundColor: color
        }}></div>
    );
}

```

## Reference
```tsx
interface Seriaizer<T> {
    read: (raw: string) => T;
    write: (value: T) => string;
}

interface UseStorageOptions<T> {
    serializer?: Seriaizer<T>; // custom serialization method
    onError?: (error: unknown) => void; // Called when an error occurs
    listenOnStroageChange?: boolean; // Listen `storage` event
}

const [data, { write, remove }] = useLocalStorage<T extends string | number | boolean | object | null>(
    key: string, // Store, get the key of the data
    value: T, // stored data
    options?: UseStorageOptions<T>
): [T, {
    write: (val: T) => void;
    remove: () => void;
}]

```
