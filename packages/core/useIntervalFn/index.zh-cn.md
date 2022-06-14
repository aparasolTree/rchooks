# useIntervalFn

定时执行一次回调函数

## 用法

```tsx
import React, { useState } from 'react';
import { useIntervalFn } from '@r-hooks/core';

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

## 参考
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
- `isActive`: 定时器是否活跃
- `clear`: 清除定时器
- `resume`: 恢复定时器
- `start`: 开启定时器

### 参数
- `delay`: 定时器间隔
- `options`:
<div>
<pre>
{
    immediate?: boolean; // 定时器立即执行
    immediateCallback?: boolean; // 定时器开启时是否立即执行一次组件更新
}
</pre>
</div>
