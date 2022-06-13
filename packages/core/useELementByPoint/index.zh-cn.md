# useElementByPoint

通过坐标获取元素

## 用法
```tsx
import React from 'react';
import { useElementByPoint } from '@r-hooks/core';

const Demo: React.FC = () => {
    const [element, stop] = useElementByPoint();
    return (
        <div>
            <pre><code>{element?.nodeName}</code></pre>
            <textarea></textarea>
            <button onClick={() => stop()}>停止监听</button>
        </div>
    );
}
```

## 参考
```tsx
const [element, stop] = useElementByPoint(): readonly [Element | null, Fn];
```

### 返回值
- `element`: 获取到的元素
- `stop`: 停止事件监听
