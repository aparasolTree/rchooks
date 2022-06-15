# useCookie

View, delete, update the specified `cookie`

## Usage

```tsx
import React from 'react';
import { useCookie } from '@rchooks/core'

const Demo: React.FC = () => {
    const [cookie, { deleteCookie, updateCookie }] = useCookie(['rchooks']);
    return (
        <div>
            <div>{cookie['rchooks']}</div>
            <button onClick={() => deleteCookie('rchooks')}>Delete</button>
            <button onClick={() => updateCookie('rchooks', 'useCookie')}>
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

interface CookieAction<T> {
    updateCookie: (key: T, newValue: string, options?: CookieOptions) => void;
    deleteCookie: (key?: T) => void;
}

const [cookie, {
    deleteCookie,
    updateCookie
}] = useCookie<T extends string>(cookieKeys: T[]): [Partial<Record<T, string>>, CookieAction<T>];
```

### Return
- `cookie`: read `cookie` value
- `deleteCookie`: Delete Specify `cookie`, without passing parameters, delete all cookies found in the query
- `updateCookie`: Update the specified `cookie` found

### Param
- `cookieName`: Array of `cookie` key values to look for