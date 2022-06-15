# useWindowScroll

Track browser window scrolling

## Usage

```tsx
import React from 'react';
import { useWindowScroll } from '@rchooks/core';

const Demo: React.FC = () => {
    const scrollOffset = useWindowScroll();
    return (
        <div style={{ height: '200vh' }}>
            <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
                {JSON.stringify(scrollOffset, null, 4)}
            </div>
        </div>
    );
}
```
