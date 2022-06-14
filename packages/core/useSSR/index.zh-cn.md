# useSSR

判断是否在服务器、浏览器还是 react native
<br />

参考 [use-ssr](https://github.com/alex-cory/use-ssr)

## 用法

```tsx
import React from 'react';
import { useSSR } from '@rchooks/core';

const Demo: React.FC = () => {
    const { isBrowser, isNative, isServer } = useSSR();

    return (
        <ul>
            <li>isBrowser: { isBrowser ? '😄' : '😞'}</li>
            <li>isNative: { isNative ? '😄' : '😞'}</li>
            <li>isServer: { isServer ? '😄' : '😞'}</li>
        </ul>
    );
}
```

## 参照
```tsx
interface UseSSRReturn {
    isBrowser: boolean;
    isServer: boolean;
    isNative: boolean;
    device: Device;
    canIUseWorker: boolean;
    canIUseEventListener: boolean;
    canIUseViewport: boolean;
}

const { isBrowser, isNative, isServer } =  useSSR(): UseSSRReturn
```
