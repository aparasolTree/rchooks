# useDebounceFn

debounce

## Usage

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

## Reference
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

### Return
- `debounceFn`: Debounced function

### 参数
- `fn`: Function to be debounced
- `ms`: time interval
- `options`: { immediate } `immediate` `debounceFn` Whether the execution of `fn` is triggered immediately