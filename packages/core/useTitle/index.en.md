# useTitle

Change the title of the page, returns a function to cancel the change

## Usage

```tsx
import React, { useState } from 'react';
import { useTitle } from '@rchooks/core';

const TestUseTitleComponent: React.FC<{ count: number }> = ({ count }) => {
    const cancel = useTitle(`${count}`, {
        titleTempalte: 'click count | %s',
        restoreOnUnmounted: true
    });
    return <button onClick={() => cancel()}>Cancel1</button>
}

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            { count < 10 ? <TestUseTitleComponent count={count} /> : ''}
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    );
}
```

## Reference
```tsx
interface UseTitleOptions {
    restoreOnUnmounted?: boolean; // When the component is uninstalled, modify document.title to the document.title before the change
    titleTempalte?: string; // title template, use '%s' substitution variable
}

const cancel = useTitle(title: string, options?: UseTitleOptions): () => false // returns a function to cancel the change
```