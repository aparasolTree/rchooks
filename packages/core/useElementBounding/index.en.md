# useElementBounding

Get element boundary data

## Usage
```tsx
import React, { useRef } from 'react';
import { useElementBounding } from '@r-hooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const bounding = useElementBounding(ref);
    return (
        <div>
            <pre><code>{JSON.stringify(bounding, null, 2)}</code></pre>
            <textarea ref={ref}></textarea>
        </div>
    );
}
```

## Reference
```tsx
interface Bounding {
    width?: number;
    height?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
}

interface UseElementBoundingOptions {
    reset?: boolean;
    windowResize?: boolean;
    windowScroll?: boolean;
}

const bounding = useElementBounding(target: React.RefObject<Element>, options: UseElementBoundingOptions): Bounding;
```

### Return
- bounding: refer to `Bounding` interface

### Params
- `target`: listen element
- `options`
<div>
<pre>
{
    reset?: boolean; // Whether to allow reset when the element does not exist (default: `true`)
    windowResize?: boolean; // Whether to listen <b style="color: orange">window</b> <b style="color: orange">resize</b> event (default: `true`)
    windowScroll?: boolean; // Whether to listen <b style="color: orange">window</b> <b style="color: orange">scroll</b> event (default: `true`)
}
</pre>
</div>