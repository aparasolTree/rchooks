# useTitle

更改网页标题，返回的函数可取消更改

## 用法

```tsx
import React, { useState } from 'react';
import { useTitle } from '@rchooks/core';

const TestUseTitleComponent: React.FC<{ count: number }> = ({ count }) => {
    const cancel = useTitle(`${count}`, {
        titleTempalte: 'click count | %s',
        restoreOnUnmounted: true
    });
    return <button onClick={() => cancel()}>Cancel1</button>
}

const Demo: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            { count < 10 ? <TestUseTitleComponent count={count} /> : ''}
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    );
}
```

## 参考
```tsx
interface UseTitleOptions {
    restoreOnUnmounted?: boolean; // 组件卸载时，终止document.title 为 更改前的 title
    titleTempalte?: string; // title 模板，使用 ‘%s’ 替换变量
}

const cancel = useTitle(title: string, options?: UseTitleOptions): () => false // 返回的函数可取消更改
```