# useTheme

get the theme, set the theme [vueuse/useColorMode](https://github.com/vueuse/vueuse/blob/main/packages/core/useColorMode/index.ts)

## Usage

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

## Reference
```tsx
type BasicColorMode = 'light' | 'dark' | 'auto' | '';
interface UseThemeOptions<T extends string = BasicColorMode>
    extends UseStorageOptions<T | BasicColorMode> {
    selector?: string; // CSS selector default: HTML
    attribute?: string; // attribute default：class
    modes?: Partial<Record<T | BasicColorMode, string>>;
    onChanged?: (mode?: T | BasicColorMode) => void;
    storageKey?: string; // Store the key value of the theme
    storage?: LikeStorage;
}

const [theme, setTheme] = useTheme<T extends string = BasicColorMode>(
    options?: UseThemeOptions<T>
): readonly [
    BasicColorMode | T,
    (val: BasicColorMode | T) => void
]
```
