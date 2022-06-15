# useCookie

查看、删除、更新指定的 `cookie`

## 使用

```tsx
import React from 'react';
import { useCookie } from '@rchooks/core'

const Demo: React.FC = () => {
    const [cookie, { deleteCookie, updateCookie }] = useCookie(['rchooks']);
    return (
        <div>
            <div>{cookie['rchooks']}</div>
            <button onClick={() => deleteCookie('rchooks')}>删除</button>
            <button onClick={() => updateCookie('rchooks', 'useCookie')}>
                更新
            </button>
        </div>
    );
}
```

## 参考

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

### 返回值
- `cookie`: 读取到的 `cookie` 值
- `deleteCookie`: 删除 指定`cookie`，不传参，删除查询到的所有cookie
- `updateCookie`: 更新查找到的指定 `cookie`

### 参数
- `cookieName`: 要查找的 `cookie` key值数组