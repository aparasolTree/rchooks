# useElementBounding

获取元素边界数据

## 用法
```tsx
import React, { useRef } from 'react';
import { useElementBounding } from '@r-hooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const bounding = useElementBounding(ref);
    return (
        <div>
            <pre><code>{JSON.stringify(bounding, null, 2)}</code></pre>
            <textarea ref={ref}></textarea>
        </div>
    );
}
```

## 参考
```tsx
interface Bounding {
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
}

interface UseElementBoundingOptions {
    reset?: boolean;
    windowResize?: boolean;
    windowScroll?: boolean;
}

const bounding = useElementBounding(target: React.RefObject<Element>, options: UseElementBoundingOptions): Bounding;
```

### 返回值
- bounding: 参考 `Bounding` interface

### 参数
- `target`: 监听的元素
- `options`
<div>
<pre>
{
    reset?: boolean; // 元素不存在时是否允许重置
    windowResize?: boolean; // 是否监听 <b style="color: orange">window</b> <b style="color: orange">resize</b> 事件
    windowScroll?: boolean; // 是否监听 <b style="color: orange">window</b> <b style="color: orange">scroll</b> 事件
}
</pre>
</div>