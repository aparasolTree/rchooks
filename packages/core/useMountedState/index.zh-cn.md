# useMountedState

获取组件挂载后的状态

## 用法

```tsx
import React, { useState } from 'react';
import { useMountedState } from '@rchooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    const isMounted = useMountedState();
    if (isMounted()) {
        console.log('component is mounted');
    }
    return (
        <button onClick={() => setCount(count + 1)}>{count}</button>
    );
}
```

## 参考
```tsx
function useMountedState(): () => boolean
```
