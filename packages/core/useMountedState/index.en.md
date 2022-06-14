# useMountedState

Get the state of the component after it is mounted

## Usage

```tsx
import React, { useState } from 'react';
import { useMountedState } from '@r-hooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    const isMounted = useMountedState();
    if (isMounted()) {
        console.log('component is mounted');
    }
    return (
        <button onClick={() => setCount(count + 1)}>{count}</button>
    );
}
```

## Reference
```tsx
function useMountedState(): () => boolean
```