# UseCSSVar

获取指定元素的 `CSS` 属性值，修改并响应到页面上

## 使用

```tsx
import React, { useRef, useEffect } from 'react';
import { useCSSVar } from '@rchooks/core';

const Demo: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [css, { setVariables: setCSS }] = useCSSVar(divRef, ['backgroundColor']);
    useEffect(() => {
        const timer = setInterval(() => {
            setCSS({ backgroundColor: '#' + Math.random()
                .toString(16)
                .slice(-6)
                .toLowerCase(),
            });
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, []);

    return (
        <div ref={divRef} style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'orange',
            transition: 'background-color 0.5s ease-in-out',
        }}>{css.backgroundColor}</div>
    );
}

```

## 参考

```tsx
type UseCSSVarReturn = readonly [
    Partial<Record<P, string>>,
    {
        readonly setVariables: (props: Partial<Record<P, string>> | ((prevProps: Props<P>) => Props<P>)) => void;
    }
];

const [css, { setVariables: setCSS }] = useCSSVar<P extends keyof CSSProperties>(
    target: React.RefObject<HTMLElement>,
    props: Array<P>
): UseCSSVarReturn
```

### 返回值
- `css`: 查询到的 css 属性集合
- `setCSS`: 修改查询到的 css 属性的值

### 参数
- `divRef`: 元素引用
- `props`: 要查询的 css 属性 key 的集合
