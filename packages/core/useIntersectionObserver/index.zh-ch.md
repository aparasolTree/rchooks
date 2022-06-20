# useIntersectionObserver

跟踪目标元素的可见性。

## 用法

```tsx
import React, { useRef, useState } from 'react';
import { useIntersectionObserver } from '@rchooks/core';

function App() {
    const ref = useRef<HTMLDivElement>(null);
    const [color, setColor] = useState('orange');
    const { cleanup } = useIntersectionObserver(ref, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            setColor('skyblue')
        }
    });
    return (
        <div style={{ height: '300vh', position: 'relative' }}>
            <div style={{
                width: '100px', height: '100px', backgroundColor: color,
                position: 'fixed', top: '10px', right: '10px'
            }}></div>
            <div style={{
                width: '100px', height: '100px', backgroundColor: 'orangered',
                position: 'absolute', bottom: '0', left: '100px'
            }} ref={ref}></div>
        </div>
    );
}

```