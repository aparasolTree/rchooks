# useClipboard

Copy text to clipboard

## Usage

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
                Copy
            </button>
            <button disabled={copied} onClick={() => read()}>
                Read
            </button>
        </div>
    );
}

export default Demo;

```

## Reference

```tsx
const [text, { isSupported, read, write, copied }] = useClipboard({
    defaultValue: 'r-hooks', copiedDuring: 1000
});

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
