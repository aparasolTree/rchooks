# useTextSelection

track text selection

## Usage

```tsx
import React from 'react';
import { useTextSelection } from '@rchooks/core';

function App() {
    const { text, rects } = useTextSelection();

    return (
        <div>
            <div style={{ backgroundColor: 'orange' }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero fugiat eaque ipsum cumque voluptatum est ut excepturi? Nemo, suscipit eius? Quaerat illum minima quam, perferendis sint totam accusantium doloremque unde?
            </div>
            <div>{text()}</div>
            <div>{JSON.stringify(rects())}</div>
        </div>
    );
}
```
