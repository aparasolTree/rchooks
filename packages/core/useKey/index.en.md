# useKey

Listen for mouse events

## Usage

```tsx
import React, { useState } from 'react';
import { useKey } from '@rchooks/core';

const Demo: React.FC = () => {
    const [color, setColor] = useState('red');
    const stop = useKey(['r', 'y', 'b', 'g'], (event) => {
        switch (event.key) {
            case 'r':
                return setColor('red');
            case 'y':
                return setColor('yellow');
            case 'b':
                return setColor('blue');
            case 'g':
                return setColor('green');
        }
    });
    return (
        <div onClick={() => stop()} style={{
            height: '100vh',
            backgroundColor: color
        }}></div>
    );
}
```

## Reference
```tsx
type Fn = (...args: any[]) => any;
type KeyFilter = string[];
type KeyHandler = (event: KeyboardEvent) => void;
interface UseKeyOptions<T extends EventTarget> {
    event?: 'keypress' | 'keydown' | 'keyup';
    target?: React.MutableRefObject<T>;
    eventOptions?: boolean | AddEventListenerOptions;
    modifier?: ('alt' | 'ctrl' | 'shift' | 'meta')[];
}

const stop = useKey<T extends EventTarget>(
    keys: KeyFilter,
    fn: KeyHandler,
    options: UseKeyOptions<T>
): Fn;
```

### Return
- `stop`: 停止事件监听

### Params
- `keys`: Array of keys that respond when the keyboard is pressed
- `fn`: execute function
- `options`:
<div>
<pre>
{
    event?: 'keypress' | 'keydown' | 'keyup'; // The type of event to listen for
    target?: React.MutableRefObject; // The target element of the specific listener event
    eventOptions?: boolean | AddEventListenerOptions; // event option
    modifier?: ('alt' | 'ctrl' | 'shift' | 'meta')[]; // modifier keys
}
</pre>
</div>
