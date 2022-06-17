# useMutationObserver

追踪DOM树的改变 [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## 用法

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { useMutationObserver } from '@rchooks/core';

function App() {
    const ref = useRef<HTMLUListElement>(null);
    const [attrs, setAttrs] = useState<string[]>([]);
    useMutationObserver(ref, (mutationRecord) => {
        if (mutationRecord[0]) {
            setAttrs([...attrs, mutationRecord[0].attributeName!]);
        }
    }, { attributes: true });

    useEffect(() => {
        const timer = setTimeout(() => {
            ref.current?.setAttribute('data-name', 'xl');
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <ul ref={ref}>
            {attrs.map((attr, i) => (
                <li key={i}>{attr}</li>
            ))}
        </ul>
    );
}
```