# useElementHover

Track if an element is hovered over

## Usage
```tsx
import React, { useRef } from 'react';
import { useElementHover } from '@r-hooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useElementHover(ref);
    return (
        <div ref={ref} style={{
            width: '200px',
            height: '200px',
            backgroundColor: isHovered ? 'orange' : 'skyblue'
        }}></div>
    );
}
```

### Reference
```tsx
const isHovered = useElementHover<T extends EventTarget>(elementRef: React.RefObject<T>): boolean
```

### Return
- `isHovered`: Whether the element is hovered over

### Param
- `elementRef`: element reference
