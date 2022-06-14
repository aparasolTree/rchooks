# useFavicon

添加或修改网站图标

## 用法
```tsx
import React, { useEffect, useState } from 'react';
import { useFavicon } from '@rchooks/core';

const Demo: React.FC = () => {
    const [href, setHref] = useState('');
    const cancel = useFavicon(href);
    useEffect(() => {
        const timer = setTimeout(() => {
            setHref('./public/favicon.png');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <button onClick={() => cancel()}>Cancel</button>
    );
}
```

## 参考
```tsx
const cancel =  useFavicon(href: string): () => false;
```

### 返回值
- `cancel`: 取消操作

### 参数
- `href`: 图标链接
