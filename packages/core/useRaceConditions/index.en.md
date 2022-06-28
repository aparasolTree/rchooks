# useRaceConditions

Resolve race conditions

# Usage

```tsx
import React, { useState } from 'react';
import { useRaceConditions } from '@rchooks/core';

function App() {
    const [num1, setNumber1] = useState(0);
    const [num2, setNumber2] = useState(0);

    useRaceConditions(
        (isCancel) => {
            async function fetchData() {
                new Promise<number>((resolve) => {
                    setTimeout(() => {
                        resolve(num1);
                    }, 1000);
                }).then((result) => {
                    if (!isCancel()) {
                        setNumber2(result);
                    }
                });
            }
            fetchData();
        },
        [num1]
    );

    return (
        <div>
            <div>{num2}</div>
            <button onClick={() => setNumber1(num1 + 1)}>+1</button>
        </div>
    );
}
```
