# useInterval

Force components to update regularly

## Usage

```tsx
import React from 'react';
import { useInterval } from '@rchooks/core';

const Demo: React.FC = () => {
    const [isActive, { clear }] = useInterval(1000);
    const width = Math.random() * window.innerWidth + 'px';
    const height = Math.random() * window.innerHeight + 'px';

    return (
        <div onClick={() => clear()} style={{
            width,
            height,
            transition: 'all 0.5s ease-in-out',
            backgroundColor: 'orangered'
        }}>{JSON.stringify(isActive)}</div>
    );
}
```

## Reference

```tsx
interface UseIntervalFnOptions {
    immediate?: boolean;
    immediateCallback?: boolean;
}

const [isActive, { clear, resume, start }] = useInterval(
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
