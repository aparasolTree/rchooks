# useActiveElement

Listen to `blur`, `focus` on `window`, return the
value of `document.activeElement`

## Usage

```tsx
import React from 'react';
import { useActiveElement } from "@rchooks/core";

const Demo: React.FC = () => {
    const activeElement = useActiveElement();
    return (
        <div>
            The currently active element is: {activeElement}
        </div>
    );
}
```