# useUpdateEffect

忽略第一次调用的 `useEffect`。 参数与 useEffect 完全相同。

## 用法

```tsx
import React from 'react';
import { useUpdateEffect, useUpdate } from '@rchooks/core';

const Demo: React.FC = () => {
    const update = useUpdate();
    useUpdateEffect(() => {
        console.log(0);
    });
    return (
        <button onClick={() => update()}>Update</button>
    );
}
```
