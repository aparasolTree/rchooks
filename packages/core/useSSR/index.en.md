# useSSR

Determine whether it is on the server, browser or react native
<br />

参考 [use-ssr](https://github.com/alex-cory/use-ssr)

## Usage

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

## Reference
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
