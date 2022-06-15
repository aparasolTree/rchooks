# useWindowSize

Track browser window size changes

## 用法

```tsx
import React from 'react';
import { useWindowSize } from '@rchooks/core';

const Demo: React.FC = () => {
    const scrollOffset = useWindowSize();
    return (
        <div style={{ height: '200vh' }}>
            <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
                {JSON.stringify(scrollOffset, null, 4)}
            </div>
        </div>
    );
}
```
