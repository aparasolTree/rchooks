# UseCSSVar

Get the `CSS` property value of the specified element, modify and respond to the page

## Usage

```tsx
import React, { useRef, useEffect } from 'react';
import { useCSSVar } from '@r-hooks/core';

const Demo: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [css, { setVariables: setCSS }] = useCSSVar(divRef, ['backgroundColor']);
    useEffect(() => {
        const timer = setInterval(() => {
            setCSS({ backgroundColor: '#' + Math.random()
                .toString(16)
                .slice(-6)
                .toLowerCase(),
            });
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, []);

    return (
        <div ref={divRef} style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'orange',
            transition: 'background-color 0.5s ease-in-out',
        }}>{css.backgroundColor}</div>
    );
}

```

## Reference

```tsx
type UseCSSVarReturn = readonly [
    Partial<Record<P, string>>,
    {
        readonly setVariables: (props: Partial<Record<P, string>> | ((prevProps: Props<P>) => Props<P>)) => void;
    }
];

const [css, { setVariables: setCSS }] = useCSSVar<P extends keyof CSSProperties>(
    target: React.RefObject<HTMLElement>,
    props: Array<P>
): UseCSSVarReturn
```

### Return
- `css`: The set of css properties queried
- `setCSS`: Modify the value of the queried css property

### Params
- `divRef`: element reference
- `props`: A collection of css property keys to query
