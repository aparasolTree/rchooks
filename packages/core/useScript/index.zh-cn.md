# useScript

向文档中注入`script`标签

## 用法

```tsx
import React, { useRef } from 'react';
import { useScript } from '@rchooks/core';

const Demo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [locadScript, cancel]  = useScript('https://unpkg.com/stiljs');

    return (
        <div ref={ref}>
            <button onClick={() => locadScript().then(() => alert('success'))}>locadScript</button>
            <button onClick={() => cancel()}>Cancel</button>
        </div>
    );
}
```

### 参考
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)
```tsx
export interface UseScriptOptions {
    defer?: boolean;
    async?: boolean;
    type?: string;
    timeout?: number;
    crossOrigin?: 'anonymous' | 'use-credentils';
    referrerPolicy?:
        | 'no-referrer'
        | 'no-referrer-when-downgrade'
        | 'origin'
        | 'origin-when-cross-origin'
        | 'same-origin'
        | 'strict-origin'
        | 'strict-origin-when-cross-origin'
        | 'unsafe-url';
    noModule?: boolean;
    attrs?: Record<string, string>; // 自定义标签属性
}

const [locadScript, cancel] = useScript(src: string, options?: UseScriptOptions): readonly [
    () => Promise<HTMLScriptElement>,
    () => void
]
```
