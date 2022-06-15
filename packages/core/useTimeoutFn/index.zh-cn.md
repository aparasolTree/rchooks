# useTimeoutFn

在指定时间后执行传入的函数

## 用法

```tsx
import React, { useState } from 'react';
import { useTimeoutFn } from '@rchooks/core';

const Demo: React.FC = () => {
    const [color, setColor] = useState('orange');
    const [isReady, { start, clear }] = useTimeoutFn(() => {
        if (color === 'orange') {
            setColor('blue')
        } else {
            setColor('orange')
        }
    }, 1000);

    const toggle = () => {
        if (isReady() === false) {
            clear();
            setColor('blue');
        } else {
            start();
            setColor('orange');
        }
    }

    return (
        <div>
            <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: color
            }}></div>
            {<button onClick={toggle}>{ color === 'orange' ? 'blue' : 'orange' }</button>}
        </div>
    );
}
```

## 参考
```tsx
const [ isReady, { start, clear } ] = useTimeoutFn<F extends Fn>(fn: F, delay?: number): readonly [
    () => boolean,
    {
        clear: () => void;
        start: () => void;
    }
]
```
