# useFetch

简单请求封装 含有缓存处理

## 用法

```tsx
import React from 'react';
import { FetchConfig, useFetch, useInterval } from '@rchooks/core';

const Demo: React.FC = () => {
    const { data } = useFetch(`data.json`);
    return (
        <div>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}

function App() {
    useInterval(1000);
    return (
        <FetchConfig value={{ baseUrl: 'http://localhost:3000/public/', fetcher: (url) => fetch(url!).then((res) => res.json()) }}>
            <Demo />
        </FetchConfig>
    );
}
```
