# useClipboard

拷贝文本到剪切板

## 使用

```tsx
import React, { useState } from 'react';
import { useClipboard } from '@r-hooks/core';

const Demo: React.FC = () => {
    const [value, setValue] = useState('');
    const [text, { isSupported, read, write, copied }] = useClipboard();
    return (
        <div>
            <div>isSupported: {isSupported}</div>
            <div>copy and read value: {text}</div>
            <input type="text" value={value} onInput={(e) => setValue(e.target.value)} />
            <button disabled={copied} onClick={() => write(value)}>
                拷贝
            </button>
            <button disabled={copied} onClick={() => read()}>
                读取
            </button>
        </div>
    );
}

export default Demo;

```

## 参考

```tsx
const [text, { isSupported, read, write, copied }] = useClipboard({
    defaultValue: 'r-hooks', copiedDuring: 1000
});

```
### 返回值
- `text`: 拷贝到剪切板的值或读取到剪切板的值
- `isSupported`: 浏览器是否支持 `clipboard API`
- `read`: 读取剪切板里的值的函数方法
- `write`: 传入一个值，将其写入到接切板
- `copied` 是否拷贝过

### 参数
- `defaultValue`: 默认拷贝值 (可选，默认值: `''`)
- `copiedDuring`: 多少秒后 copied 变为 false (可选，默认值: `1600`)
