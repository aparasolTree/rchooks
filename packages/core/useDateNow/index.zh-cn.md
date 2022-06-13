# useDateNow

获取当前时间戳

## 用法

```tsx
import React from 'react';
import { useDateNow } from '@r-hooks/core';

const Demo: React.FC = () => {
    const [now, { isActive, start, cancel }] = useDateNow({ immediate: true });
    return (
        <div>
            <div>isActive: {JSON.stringify(isActive)}</div>
            <div>{now}</div>
            <button onClick={() => start()}>开始</button>
            <button onClick={() => cancel()}>取消</button>
        </div>
    );
}
```

## 参考
```tsx
export type UseDateNowReturn = readonly [
    number,
    {
        readonly isActive: boolean;
        readonly start: () => void;
        readonly cancel: () => void;
    }
];

const [now, { isActive, start, cancel }] = useDateNow(options: { immediate?: boolean }): UseDateNowReturn;
```

### 返回值
- `now`: 当前时间戳
- `isActive`: `useDateNow` 是否在工作
- `start`: 开始工作
- `cancel`: 停止工作

### 参数
- options: { immediate } `immediate` 是否立即触发(默认: true)
