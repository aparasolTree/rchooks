# useEventListener

在指定的目标上添加监听事件（默认在 `window` 上添加）

## 用法
```tsx
import React, { useRef, useState } from 'react';
import { useEventListener } from '@rchooks/core';

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

## 参考
[useEventListener](./index.ts)
### 返回值
[useEventListener](./index.ts)
### 参数
[useEventListener](./index.ts)
