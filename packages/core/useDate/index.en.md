# useDate

get formatted date

## Usage

```tsx
import React from 'react';
import { useDate } from '@rchooks/core';

const Demo: React.FC = () => {
    const date = useDate(new Date(), 'YYYY/MM/DD HH:mm:ss SSS');
    return (
        <div>{date}</div>
    );
}
```

## Reference
```tsx
type DateLike = Date | number | string | undefined;

const date = useDate(date: DateLike, format: string): string;
```

### Return
- `date`: formatted date

### Params
- `date`: You can pass a date string in the format of `new Date()` or `number` or `YYYY/MM/DD HH:mm:ss SSS`
- `format`: formatting template