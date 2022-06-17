# useElementScroll

Track element scrolling [@vueuse/core](https://github.com/vueuse/vueuse/blob/3a6b9d5c3db0826ddda81e9412c50dce7f35341b/packages/core/useScroll/index.ts)

## Usage

```tsx
import React, { useRef } from 'react';
import { useElementScroll } from '@rchooks/core';

function App() {
    const ref = useRef<HTMLDivElement>(null);
    const [offset] = useElementScroll(ref, {
        onScrollEnd(offset) {
            console.log(offset);
        }
    });

    return (
        <div style={{ width: '100px', height: '100px', overflow: 'auto' }} ref={ref}>
            <div style={{ height: '100vh' }}></div>
            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                <pre>{JSON.stringify(offset, null, 2)}</pre>
            </div>
        </div>
    );
}
```

## 参考
```tsx
interface UseElementScrollOptions {
    throttleDelay?: number; // throttling interval
    onScroll?: (offset: ScrollOffset) => void; // Triggered while scrolling
    onScrollEnd?: (offset: ScrollOffset) => void; // Fired when scrolling ends
    idle?: number; // Check time at end of roll
    eventOptions?: boolean | AddEventListenerOptions;
}

interface ScrollOffset {
    left?: number;
    bottom?: number;
    top?: number;
    right?: number;
    x?: number;
    y?: number;
}

const [offset, { stop }] = useElementScroll(
    eleRef: React.RefObject<Element>,
    options?: UseElementScrollOptions
): readonly [
    ScrollOffset,
    {
        readonly stop: Fn; // stop event listener
    }
]
```
