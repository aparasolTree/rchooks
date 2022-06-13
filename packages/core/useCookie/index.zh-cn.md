# useCookie

查看、删除、更新指定的 `cookie`

## 使用

```tsx
import React from 'react';
import { useCookie } from '@r-hooks/core'

const Demo: React.FC = () => {
    const [cookie, { deleteCookie, updateCookie }] = useCookie('r-hooks');
    return (
        <div>
            <div>{cookie}</div>
            <button onClick={() => deleteCookie()}>删除</button>
            <button onClick={() => updateCookie('useCookie')}>
                更新
            </button>
        </div>
    );
}

export default Demo;
```

## 参考

```tsx
const [cookie, { deleteCookie, updateCookie }] = useCookie('r-hooks');
```

### 返回值
- `cookie`: 读取到的 `cookie` 值
- `deleteCookie`: 删除 `cookie`
- `updateCookie`: 更新 `cookie`

### 参数
- `cookieName`: 要查找的 `cookie` key值