# useSetState

模拟 `class 组件` 中的 `this.setState`

# 用法

```tsx
import React from 'react';
import { useSetState } from '@rchooks/core';

const Demo: React.FC = () => {
    const [style, setStyle] = useSetState({ width: '100px', height: '100px', backgroundColor: 'orange' });

    return (
        <div style={style} onClick={() => setStyle((s) => ({
            width: parseFloat(s.width) + 10 + 'px'
        }))}></div>
    );
}
```

## 参考

```tsx
const [state, setState] = useSetState<T>(initialState: T | (() => T)): readonly [
    T,
    (newValue: Partial<T> | ((prevState: T) => Partial<T>)) => void
]
```
