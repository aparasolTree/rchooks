# useMouse

追踪鼠标坐标

## 用法
```tsx
import React from 'react';
import { useMouse } from '@r-hooks/core';

const Demo: React.FC = () => {
    const { x, y } = useMouse();
    return (
        <div>
            x: {x} - y: {y}
        </div>
    );
}
```

## 参考
```tsx
interface Position {
    x?: number;
    y?: number;
}

interface UseMouseOptions {
    initialPosition?: Position; // 初始值 (默认：{ x: 0, y: 0 })
    type?: 'page' | 'client'; // 获取坐标的类型 (默认: 'page')
}

function useMouse(options?: UseMouseOptions): Position
```
