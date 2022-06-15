# useTimeout

在指定的毫秒数后重新渲染组件。

## 用法

```tsx
import React from 'react';
import { useTimeout } from '@rchooks/core';

const Demo: React.FC = () => {
    const [ isReady, { start, clear } ] = useTimeout(1000);
    return (
        <div>
            isReady: {JSON.stringify(isReady())}
            <br />
            {isReady() ? <button onClick={() => start()}>Start</button> : <button onClick={() => clear()}>Clear</button>}
        </div>
    );
}
```

## 用法
```tsx
const [ isReady, { start, clear } ] = useTimeout(delay?: number): readonly [
    () => boolean,
    {
        clear: () => void;
        start: () => void;
    }
]
```