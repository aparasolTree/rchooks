# useProxy

The proxy object, which can directly modify the property value, thereby modifying the content of the page (principle: force the component to update when the modification operation is performed)
<br />
<br />
refer to [vue3 reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity)

## Usage

```tsx
import React from 'react';
import { useProxy } from '@rchooks/core';

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

### Reference
```tsx
export interface ProxyOptions {
    isReadonly?: boolean;
    isShadow?: boolean;
}

const proxyState = function useProxy<T extends object>(initialState: T, options?: ProxyOptions): T
```
