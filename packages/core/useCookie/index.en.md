# useCookie

View, delete, update the specified `cookie`

## Usage

```tsx
import React from 'react';
import { useCookie } from '@rchooks/core'

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
```

## Reference

```tsx
export interface CookieOptions {
    maxAge?: number;
    signed?: boolean;
    expires?: Date | string | number;
    httpOnly?: boolean;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
}

interface CookieAction {
    updateCookie: (newValue: string, options?: CookieOptions) => void;
    deleteCookie: () => void;
}

const [cookie, {
    deleteCookie,
    updateCookie
}] = useCookie(cookieKey: string): [string, CookieAction];
```

### Return
- `cookie`: read `cookie` value
- `deleteCookie`: delete `cookie`
- `updateCookie`: update `cookie`

### Params
- `cookieName`: `cookie` key value to look up