# useElementSize

Listen element size changes

## Usage
```tsx
import React, { useRef } from 'react';
import { useElementSize } from '@rchooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const { width, height } = useElementSize(ref);

    return (
        <div >
            <div>width: {width} - height: {height}</div>
            <textarea ref={ref}></textarea>
        </div>
    );
}
```

## Reference
```tsx
export interface Size {
    width?: number;
    height?: number;
}

const size = useElementSize(
    target: React.RefObject<Element>,
    initialSize: Size,
    options: ResizeObserverOptions
): Size
```

### Return
- `size`: refer to `Size` interface

### Params
- `target`: element reference
- `initialSize`: initial size (default: { width: 0, height: 0 })
- options: refer to [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
