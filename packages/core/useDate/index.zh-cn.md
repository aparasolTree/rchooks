# useDate

获取格式化后的日期

## 用法

```tsx
import React from 'react';
import { useDate } from '@r-hooks/core';

const Demo: React.FC = () => {
    const date = useDate(new Date(), 'YYYY/MM/DD HH:mm:ss SSS');
    return (
        <div>{date}</div>
    );
}
```

## 参考
```tsx
type DateLike = Date | number | string | undefined;

const date = useDate(date: DateLike, format: string): string;
```

### 返回值
- `date`: 格式化后的日期

### 参数
- `date`: 可传入 `new Date()` 或 `数字` 或 `YYYY/MM/DD HH:mm:ss SSS`这种格式的日期字符串
- `format`: 格式化模板
