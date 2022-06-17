# useElementScroll

跟踪元素滚动 [@vueuse/core](https://github.com/vueuse/vueuse/blob/3a6b9d5c3db0826ddda81e9412c50dce7f35341b/packages/core/useScroll/index.ts)

## 用法

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
    throttleDelay?: number; // 节流时间间隔
    onScroll?: (offset: ScrollOffset) => void; // 滚动中触发
    onScrollEnd?: (offset: ScrollOffset) => void; // 滚动结束时触发
    idle?: number; // 滚动结束时的检查时间
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
        readonly stop: Fn; // 停止事件监听
    }
]
```
