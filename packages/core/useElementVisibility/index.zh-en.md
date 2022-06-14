# useElementVisibility

监听元素是否在窗口内

## 用法
```tsx
import React, { useRef } from 'react';
import { useElementVisibility } from '@rchooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const elementIsVisibility = useElementVisibility(ref);
    return (
        <div style={{height: "200vh"}}>
            <div style={{
                position: 'fixed',
                top: '10px',
                right: '20px'
            }}>
                {JSON.stringify(elementIsVisibility)}
            </div>
            <div ref={ref} style={{
                position: 'relative',
                top: '100px',
                left: '100px',
                backgroundColor: 'orange',
                width: '100px',
                height: '100px'
            }}></div>
        </div>
    );
}
```

## 参考

```tsx
const elementIsVisibility = useElementVisibility(elementRef: React.RefObject<Element>): boolean
```

### 返回值
- `elementIsVisibility`: 元素是否在窗口内

### 参数
- `elementRef`: 引用元素