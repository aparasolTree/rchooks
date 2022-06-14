# useDateNow

Get current timestamp

## Usage

```tsx
import React from 'react';
import { useDateNow } from '@rchooks/core';

const Demo: React.FC = () => {
    const [now, { isActive, start, cancel }] = useDateNow({ immediate: true });
    return (
        <div>
            <div>isActive: {JSON.stringify(isActive)}</div>
            <div>{now}</div>
            <button onClick={() => start()}>Start</button>
            <button onClick={() => cancel()}>Cancel</button>
        </div>
    );
}
```

## Reference
```tsx
export type UseDateNowReturn = readonly [
    number,
    {
        readonly isActive: boolean;
        readonly start: () => void;
        readonly cancel: () => void;
    }
];

const [now, { isActive, start, cancel }] = useDateNow(options: { immediate?: boolean }): UseDateNowReturn;
```

### 返回值
- `now`: current timestamp
- `isActive`: Is `useDateNow` working
- `start`: start working
- `cancel`: cancel work

### 参数
- options: { immediate } `immediate` whether to fire immediately (default: true)
