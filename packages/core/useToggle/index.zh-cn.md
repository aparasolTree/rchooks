# useToggle

真假值切换器

## 用法

```tsx
import React from 'react';
import { useToggle  } from '@rchooks/core';

const Demo: React.FC = () => {
    const [isShow, toggle] = useToggle(true);
    return (
        <div>
            { isShow ? 'show' : '' }
            <button onClick={() => toggle(!isShow)}>Toggle</button>
        </div>
    );
}
```

## 参考
```tsx
interface UseToggleOptions<Truth, False> {
    truthValue?: Truth;
    falseValue?: False;
}

function useToggle<Truth = true, False = false, T extends Truth | False = Truth | False>(
    initialValue: T,
    options?: UseToggleOptions<Truth, False>
): [T, (value?: T) => void];

function useToggle<Truth, False, T extends Truth | False = Truth | False>(
    initialValue?: T,
    options?: UseToggleOptions<Truth, False>
): [T, (value?: T) => void];
```
