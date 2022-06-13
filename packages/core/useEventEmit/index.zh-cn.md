# useEventEmit

用于不同组件间相互通信

## 用法

```tsx
import React, { useEffect, useState } from 'react';
import { useEventEmit } from '@r-hooks/core';

const Demo1: React.FC = () => {
    const reactEvent = useEventEmit('react');
    const [color, setColor] = useState('orange');
    useEffect(() => {
        reactEvent.addListener((color: string) => {
            setColor(color);
        });
    }, []);

    return (
        <div style={{
            height: "100px",
            width: '100px',
            backgroundColor: color
        }}></div>
    );
}

const Demo2: React.FC = () => {
    const reactEvent = useEventEmit('react');

    return (
        <button onClick={() => reactEvent.disPatch('skyblue')}>
            Click
        </button>
    );
}
```

## 参考
```tsx
const eventEmit = useEventEmit<T = any>(key: string): EventEmit<T>
```

### 返回值
- `eventEmit`: EventEmit 类的实例

### 参数
- `key`: 事件名称
