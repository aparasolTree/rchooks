# useUpdate

Force component update

## Usage

```tsx
import React, { useEffect } from 'react';
import { useUpdate  } from '@rchooks/core';

const Demo: React.FC = () => {
    const update = useUpdate();
    useEffect(() => {
        console.log(0);
    });
    return (
        <button onClick={() => update()}>Update</button>
    );
}
```
