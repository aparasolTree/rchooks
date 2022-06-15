# useUnmount

在组件卸载后执行

## Usage

```tsx
import React from 'react';
import { useToggle, useUnmount  } from '@rchooks/core';

const TestUseUnmount = () => {
    useUnmount(() => {
        console.log(0);
    });
    return <div>useToggle</div>
}

const Demo: React.FC = () => {
    const [isShow, toggle] = useToggle(true);
    return (
        <div>
            { isShow ? <TestUseUnmount /> : '' }
            <button onClick={() => toggle(!isShow)}>Toggle</button>
        </div>
    );
}
```

## Reference
```tsx
type Fn = (...args: any[]) => any;

useUnmount(fn: Fn): void;
```
