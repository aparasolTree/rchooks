# useMediaQuery

Use media queries

## 用法

```tsx
import React from 'react';
import { useMediaQuery } from '@r-hooks/core';

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
    query: string, // query string
    defaultState?: boolean // default
): boolean
```
