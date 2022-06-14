# useMediaQuery

使用媒体查询

## 用法

```tsx
import React from 'react';
import { useMediaQuery } from '@rchooks/core';

const Demo: React.FC = () => {
    const isDark = useMediaQuery('prefers-color-scheme');
    return (
        <div>{JSON.stringify(isDark)}</div>
    );
}
```

### 参考

```tsx
const matches = useMediaQuery(
    query: string, // 查询字符串
    defaultState?: boolean // 默认值
): boolean
```
