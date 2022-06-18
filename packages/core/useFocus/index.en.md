# useFocus

Traces whether the specified element is in focus

```tsx
import React, { useRef } from 'react';
import { useFocus } from '@rchooks/core';

function App() {
    const ref = useRef<HTMLInputElement>(null);
    const [focused] = useFocus(ref);
    return (
        <div>
            <input ref={ref} />
            <div>{JSON.stringify(focused)}</div>
        </div>
    );
}
```
