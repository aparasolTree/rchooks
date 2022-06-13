# useEventListener

Add a listener event on the specified target (default on `window`)

## Usage
```tsx
import React, { useRef, useState } from 'react';
import { useEventListener } from '@r-hooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [color, setColor] = useState('orange');
    useEventListener(ref, 'click', () => {
        setColor(`#${Math.random().toString(16).slice(-6).toLowerCase()}`)
    });

    return (
        <div ref={ref} style={{
            height: "100px",
            width: '100px',
            backgroundColor: color,
        }}></div>
    );
}
```

## Reference
[useEventListener](./index.ts)
### Return
[useEventListener](./index.ts)
### Param
[useEventListener](./index.ts)