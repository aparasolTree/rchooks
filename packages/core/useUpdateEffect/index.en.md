# useUpdateEffect

The first call to `useEffect` is ignored. The parameters are exactly the same as useEffect.

## Usage

```tsx
import React from 'react';
import { useUpdateEffect, useUpdate } from '@rchooks/core';

const Demo: React.FC = () => {
    const update = useUpdate();
    useUpdateEffect(() => {
        console.log(0);
    });
    return (
        <button onClick={() => update()}>Update</button>
    );
}
```
