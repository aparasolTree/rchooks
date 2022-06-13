# useClamp

限制修改值的范围

## 使用

```tsx
import React from 'react';
import { useClamp } from '@r-hooks/core';

const Demo: React.FC = () => {
    const [count, setCount] = useClamp(0, 0, 1000); // 在 0 - 1000 之间变动
    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}

export default Demo;

```
