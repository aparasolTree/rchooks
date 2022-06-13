# useActiveElement

监听 `window` 上的 `blur`、`focus`， 返回 `document.activeElement`

## Usage

```tsx
import React from 'react';
import { useActiveElement } from "@r-hooks/core";

const Demo: React.FC = () => {
    const activeElement = useActiveElement();
    return (
        <div>当前活跃的元素是：{activeElement}</div>
    );
}

export default Demo;

```