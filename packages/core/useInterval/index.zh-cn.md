# useInterval

强制组件定时更新

## 用法

```tsx
import React from 'react';
import { useInterval } from '@r-hooks/core';

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

## 参考

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
