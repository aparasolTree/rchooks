# useDownload

传入 src 下载网络资源

## 使用

```tsx
import React from 'react';
import { useDownload } from '@rchooks/core';

const Demo: React.FC = () => {
    const { total, loaded, execute } = useDownload('/public/姜子牙.mp4', { immediate: false });
    return (
        <div>
            <div>{loaded}/{total}</div>
            <button onClick={() => execute()}>Execute</button>
        </div>
    );
}
```

## 参考
```tsx
interface UseDownloadOptions {
    immediate?: boolean;
    onError?: (error: unknown) => void;
    onSuccess?: (fileInfo: IFileInfo) => void;
}

interface IFileInfo {
    url: string;
    filename: string;
    extension: string;
    hash: string;
    host: string;
    hostname: string;
    origin: string;
    pathname: string;
    protocol: string;
}

interface UseDownloadReturn {
    total: number;
    fileInfo: IFileInfo | null | undefined;
    loaded: number;
    execute: () => void;
}

const {
    total,
    fileInfo,
    loaded,
    execute
} = useDownload(url: string, options: UseDownloadOptions): UseDownloadReturn
```

### 返回值
- `total`: 文件总大小
- `loaded`: 文件已加载的大小
- `fileInfo`: 文件信息
- `execute`: 执行下载

### 参数
- `url`: 资源链接
- `options`:
<div>
<pre>
{
    immediate?: boolean; // 是否立即执行
    onError?: (error: unknown) => void; // 执行错误时调用
    onSuccess?: (fileInfo: IFileInfo) => void; // 下载成功时调用
}
</pre>
</div>
