# useEventEmit

For communication between different components

## Usage

```tsx
import React, { useEffect, useState } from 'react';
import { useEventEmit } from '@rchooks/core';

const Demo1: React.FC = () => {
    const reactEvent = useEventEmit('react');
    const [color, setColor] = useState('orange');
    useEffect(() => {
        reactEvent.addListener((color: string) => {
            setColor(color);
        });
    }, []);

    return (
        <div style={{
            height: "100px",
            width: '100px',
            backgroundColor: color
        }}></div>
    );
}

const Demo2: React.FC = () => {
    const reactEvent = useEventEmit('react');

    return (
        <button onClick={() => reactEvent.disPatch('skyblue')}>
            Click
        </button>
    );
}
```

## Reference
```tsx
const eventEmit = useEventEmit<T = any>(key: string): EventEmit<T>
```

### Return
- `eventEmit`: Instance of the EventEmit class

### Param
- `key`: event name
