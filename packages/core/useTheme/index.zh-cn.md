# useTheme

获取主题，修改主题 [vueuse/useColorMode](https://github.com/vueuse/vueuse/blob/main/packages/core/useColorMode/index.ts)

## 用法

```tsx
import React from 'react';
import { useTheme } from '@rchooks/core';

function App() {
    const [theme, setTheme] = useTheme({ modes: { 'light': '', dark: 'dark' } });
    return (
        <div>
            <div>{theme}</div>
            <button onClick={() => setTheme(theme === '' ? 'dark' : '')}>{theme}</button>
        </div>
    );
}
```

## 参考
```tsx
type BasicColorMode = 'light' | 'dark' | 'auto' | '';
interface UseThemeOptions<T extends string = BasicColorMode>
    extends UseStorageOptions<T | BasicColorMode> {
    selector?: string; // css 选择器 default：html
    attribute?: string; // 属性 default：class
    modes?: Partial<Record<T | BasicColorMode, string>>;
    onChanged?: (mode?: T | BasicColorMode) => void;
    storageKey?: string; // 存储主题的键值
    storage?: LikeStorage;
}

const [theme, setTheme] = useTheme<T extends string = BasicColorMode>(
    options?: UseThemeOptions<T>
): readonly [
    BasicColorMode | T,
    (val: BasicColorMode | T) => void
]
```
