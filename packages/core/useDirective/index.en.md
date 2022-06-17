# useDirective

Mimic vue Directive (v0.0.1)

## Usage

```tsx
import React, { useState } from 'react';
import { useDirective } from '@rchooks/core';

useDirective.register('r-copy', (el: Element) => {
    const clickHandler = async (event: Event) => {
        const target = event.target as HTMLElement;
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(target.textContent || '');
            alert('success');
        }
    }

    el.addEventListener('click', clickHandler);

    return () => {
        el.removeEventListener('click', clickHandler);
    }
});

function App() {
    const [show, setShow] = useState(true)
    return (
        <div>
            <div ref={useDirective<HTMLDivElement, boolean>('r-show', show)}
                style={{
                    width: '100px', height: '100px', backgroundColor: 'orange'
                }}
            ></div>
            <button onClick={() => setShow(!show)}>Change</button>
            <div ref={useDirective('r-copy')}> lasdsaasjdhiwhdiuwqhdiwhdiuwhd </div>
        </div>
    );
}
```
