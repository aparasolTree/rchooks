# useCookie

View, delete, update the specified `cookie`

## Usage

```tsx
import React from 'react';
import { useCookie } from '@r-hooks/core'

const Demo: React.FC = () => {
    const [cookie, { deleteCookie, updateCookie }] = useCookie('r-hooks');
    return (
        <div>
            <div>{cookie}</div>
            <button onClick={() => deleteCookie()}>Delete</button>
            <button onClick={() => updateCookie('useCookie')}>
                Update
            </button>
        </div>
    );
}

export default Demo;
```

## Reference

```tsx
const [cookie, { deleteCookie, updateCookie }] = useCookie('r-hooks');
```

### Return
- `cookie`: read `cookie` value
- `deleteCookie`: delete `cookie`
- `updateCookie`: update `cookie`

### Params
- `cookieName`: `cookie` key value to look up