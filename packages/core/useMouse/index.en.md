# useMouse

track mouse coordinates

## Usage
```tsx
import React from 'react';
import { useMouse } from '@rchooks/core';

const Demo: React.FC = () => {
    const { x, y } = useMouse();
    return (
        <div>
            x: {x} - y: {y}
        </div>
    );
}
```

## Reference
```tsx
interface Position {
    x?: number;
    y?: number;
}

interface UseMouseOptions {
    initialPosition?: Position; // initial Position (default{ x: 0, y: 0 })
    type?: 'page' | 'client'; // Get the type of coordinates (default: 'page')
}

function useMouse(options?: UseMouseOptions): Position
```
