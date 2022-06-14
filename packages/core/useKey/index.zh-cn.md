# useKey

监听鼠标事件

## 使用

```tsx
import React, { useState } from 'react';
import { useKey } from '@rchooks/core';

const Demo: React.FC = () => {
    const [color, setColor] = useState('red');
    const stop = useKey(['r', 'y', 'b', 'g'], (event) => {
        switch (event.key) {
            case 'r':
                return setColor('red');
            case 'y':
                return setColor('yellow');
            case 'b':
                return setColor('blue');
            case 'g':
                return setColor('green');
        }
    });
    return (
        <div onClick={() => stop()} style={{
            height: '100vh',
            backgroundColor: color
        }}></div>
    );
}
```

## 参考
```tsx
type Fn = (...args: any[]) => any;
type KeyFilter = string[];
type KeyHandler = (event: KeyboardEvent) => void;
interface UseKeyOptions<T extends EventTarget> {
    event?: 'keypress' | 'keydown' | 'keyup';
    target?: React.MutableRefObject<T>;
    eventOptions?: boolean | AddEventListenerOptions;
    modifier?: ('alt' | 'ctrl' | 'shift' | 'meta')[];
}

const stop = useKey<T extends EventTarget>(
    keys: KeyFilter,
    fn: KeyHandler,
    options: UseKeyOptions<T>
): Fn;
```

### 返回值
- `stop`: 停止事件监听

### 参数
- `keys`: 键盘按下时具体响应的按键数组
- `fn`: 执行函数
- `options`:
<div>
<pre>
{
    event?: 'keypress' | 'keydown' | 'keyup'; // 监听的时间类型
    target?: React.MutableRefObject; // 具体监听事件的目标元素
    eventOptions?: boolean | AddEventListenerOptions; // 事件 option
    modifier?: ('alt' | 'ctrl' | 'shift' | 'meta')[]; // 修饰按键
}
</pre>
</div>
