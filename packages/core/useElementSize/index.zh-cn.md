# useElementSize

监听元素大小变化

## 用法
```tsx
import React, { useRef } from 'react';
import { useElementSize } from '@r-hooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const { width, height } = useElementSize(ref);

    return (
        <div >
            <div>width: {width} - height: {height}</div>
            <textarea ref={ref}></textarea>
        </div>
    );
}
```

## 参照
```tsx
export interface Size {
    width?: number;
    height?: number;
}

const size = useElementSize(
    target: React.RefObject<Element>,
    initialSize: Size,
    options: ResizeObserverOptions
): Size
```

### 返回值
- `size`: 参考 Size interface

### 参数
- `target`: 元素引用
- `initialSize`: 初始大小 (默认: { width: 0, height: 0 })
- options: 参考 [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
