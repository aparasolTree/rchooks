# useElementByPoint

Get element by coordinates

## Usage
```tsx
import React from 'react';
import { useElementByPoint } from '@r-hooks/core';

const Demo: React.FC = () => {
    const [element, stop] = useElementByPoint();
    return (
        <div>
            <pre><code>{element?.nodeName}</code></pre>
            <textarea></textarea>
            <button onClick={() => stop()}>Stop</button>
        </div>
    );
}
```

## Reference
```tsx
const [element, stop] = useElementByPoint(): readonly [Element | null, Fn];
```

### Return
- `element`: fetched element
- `stop`: stop event listener
