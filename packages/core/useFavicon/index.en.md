# useFavicon

Add or modify favicons

## Usage
```tsx
import React, { useEffect, useState } from 'react';
import { useFavicon } from '@r-hooks/core';

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

## Reference
```tsx
const cancel =  useFavicon(href: string): () => false;
```

### Return
- `cancel`: 取消操作

### Param
- `href`: 图标链接
