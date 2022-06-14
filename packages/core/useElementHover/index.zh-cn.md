# useElementHover

跟踪某个元素是否被鼠标悬停

## 用法
```tsx
import React, { useRef } from 'react';
import { useElementHover } from '@rchooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useElementHover(ref);
    return (
        <div ref={ref} style={{
            width: '200px',
            height: '200px',
            backgroundColor: isHovered ? 'orange' : 'skyblue'
        }}></div>
    );
}
```

### 参考
```tsx
const isHovered = useElementHover<T extends EventTarget>(elementRef: React.RefObject<T>): boolean
```

### 返回值
- `isHovered`: 元素是否被鼠标悬停

### 参数
- `elementRef`: 元素引用
