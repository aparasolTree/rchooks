# useDownload

Pass in src to download network resources

## Usage

```tsx
import React from 'react';
import { useDownload } from '@r-hooks/core';

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

## Refercnce
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

### Return
- `total`: total file size
- `loaded`: file loaded size
- `fileInfo`: file information
- `execute`: perform download

### 参数
- `url`: resource link
- `options`:
<div>
<pre>
{
    immediate?: boolean; // whether to execute immediately
    onError?: (error: unknown) => void; // Called on execution error
    onSuccess?: (fileInfo: IFileInfo) => void; // Called when the download is successful
}
</pre>
</div>
