# useDebounceFn

防抖

## 使用

```tsx
import React from 'react';
import { useDebounceFn } from '@r-hooks';

const Demo: React.FC = () => {
    const [count, setCount] = useState(0)
    const debounceFn = useDebounceFn(() => setCount(count + 1), 1000, { immediate: true });
    return (
        <button onClick={() => debounceFn()}>{count}</button>
    );
}

```

## 参考
```tsx
interface DebounceOptions {
    immediate?: boolean;
}

const debounceFn = useDebounceFn<T extends Fn>(
    fn: T,
    ms: number,
    options: DebounceOptions
): (this: unknown, ...args: Parameters<T>) => any;
```

### 返回值
- `debounceFn`: 防抖化后的函数

### 参数
- `fn`: 要防抖处理的函数
- `ms`: 时间间隔
- `options`: { immediate } `immediate` `debounceFn` 执行 `fn` 是否立即触发