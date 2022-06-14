# useIntervalFn

Execute a callback function regularly

## Usage

```tsx
import React, { useState } from 'react';
import { useIntervalFn } from '@rchooks/core';

const Demo: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isActive, { clear }] = useIntervalFn(() => {
        setPosition({
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight - 100,
        });
    }, 1000);

    return (
        <div onClick={() => clear()} style={{
            width: '100px',
            height: '100px',
            borderRadius: '10px',
            transition: 'all 1s ease-in-out',
            backgroundColor: 'orangered',
            position: 'fixed',
            transform: `translate(${position.x}px, ${position.y}px)`
        }}>{JSON.stringify(isActive)}</div>
    );
}
```

## Reference
```tsx
type Fn = (...args: any[]) => any

interface UseIntervalFnOptions {
    immediate?: boolean;
    immediateCallback?: boolean;
}

const [isActive, { clear, start, resume }] = useIntervalFn(
    fn: Fn,
    delay: number,
    options?: UseIntervalFnOptions
): readonly [boolean, {
    clear: () => void;
    resume: () => void;
    start: () => void;
}]
```

### 返回值
- `isActive`: Whether the timer is active
- `clear`: clear timer
- `resume`: resume timer
- `start`: start timer

### 参数
- `delay`: timer interval
- `options`:
<div>
<pre>
{
    immediate?: boolean; // The timer executes immediately
    immediateCallback?: boolean; // Whether to perform a component update immediately when the timer starts
}
</pre>
</div>