# useStyle

Inject style tags into the document

## Usage

```tsx
import React from 'react';
import { useStyle } from '@rchooks/core';

const Demo: React.FC = () => {
    const [className, setStyle] = useStyle({
        width: '100px',
        height: '100px',
        backgroundColor: 'orangered'
    }, ['width', 'height']);

    return (
        <div className={className} onClick={() => setStyle((s) => ({
            width: parseFloat(s.width) + 10 + 'px',
            height: parseFloat(s.height) + 20 + 'px',
        }))}></div>
    );
}
```

## Reference
```tsx
const [className, setStyle] = useStyle<C extends React.CSSProperties, D extends keyof C>(
    cssRules: C,
    deps?: D[]
): readonly [
    string,
    (styleMap: Partial<Record<D, C[D]>> | ((prevStyle: Record<D, C[D]>) => Partial<Record<D, C[D]>>)) => void
]
```
