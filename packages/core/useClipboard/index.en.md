# useClipboard

Copy text to clipboard

## Usage

```tsx
import React, { useState } from 'react';
import { useClipboard } from '@rchooks/core';

const Demo: React.FC = () => {
    const [value, setValue] = useState('');
    const [text, { isSupported, read, write, copied }] = useClipboard();
    return (
        <div>
            <div>isSupported: {isSupported}</div>
            <div>copy and read value: {text}</div>
            <input type="text" value={value} onInput={(e) => setValue(e.target.value)} />
            <button disabled={copied} onClick={() => write(value)}>
                Copy
            </button>
            <button disabled={copied} onClick={() => read()}>
                Read
            </button>
        </div>
    );
}
```

## Reference

```tsx
export interface UseClipboardOptions<S> {
    delaultValue?: S;
    copiedDuring?: number;
}

const [text, {
    isSupported,
    read,
    write,
    copied
}] = useClipboard<S>(options: UseClipboardOptions<S>): UseClipboardReturn<boolean>;

export interface UseClipboardReturn<C> {
    isSupported: boolean;
    copied?: boolean;
    copy: C extends true ? (text?: string) => Promise<void> : (text: string) => Promise<void>;
    read: () => void;
}
```
### return
- `text`: Value copied to clipboard or read from clipboard
- `isSupported`: Whether the browser supports the `clipboard API`
- `read`: Function method to read the value in the clipboard
- `write`: Pass in a value to write to the clipboard
- `copied`: Has it been copied

### params
- `defaultValue`: default copy value (optional, default: `''`)
- `copiedDuring`: The number of seconds after which copied becomes false (optional, default: `1600`)
