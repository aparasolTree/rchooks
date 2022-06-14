# useProxy

代理对象 可直接修改属性值 从而修改页面内容 (原理：执行修改操作时 强制组件更新)
参考 [vue3 reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity)

## 用法

```tsx
import React from 'react';
import { useProxy } from '@r-hooks/core';

const Demo: React.FC = () => {
    const state = useProxy({ count: 1, user: { name: 'xl', age: 19 }, like: ['react'] }, {
        isReadonly: false,
        isShadow: false
    });

    return (
        <div>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <button onClick={() => state.count += 1}>count + 1</button>
            <button onClick={() => state.user.age += 1}>state.user.age + 1</button>
            <button onClick={() => state.like.push('vue')}>state.like.push('vue')</button>
        </div>
    );
}
```

### 参考
```tsx
export interface ProxyOptions {
    isReadonly?: boolean; // 是否只读
    isShadow?: boolean; // 是否浅响应
}

const proxyState = function useProxy<T extends object>(initialState: T, options?: ProxyOptions): T
```
