# useUpdate

强制组件更新

## 用法

```tsx
import React, { useEffect } from 'react';
import { useUpdate  } from '@rchooks/core';

const Demo: React.FC = () => {
    const update = useUpdate();
    useEffect(() => {
        console.log(0);
    });
    return (
        <button onClick={() => update()}>Update</button>
    );
}
```
