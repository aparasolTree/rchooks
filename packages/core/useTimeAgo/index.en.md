# useTimeAgo

Reactive time ago

## Usage

```tsx
import React from 'react';
import { useTimeAgo, UseTimeAgoFormat } from '@rchooks/core';

const zhCnformat: UseTimeAgoFormat = {
    justNow: ['刚才', '一会儿'],
    secondsAgo: ['%s 秒钟前', '%s 秒钟后'],
    minuteAgo: ['%s 分钟钟前', '%s 分钟中后'],
    hoursAgo: ['%s 小时前', '%s 小时后'],
    daysAgo: ['%s 天前', '%s 天后'],
    monthsAgo: ['%s 个月前', '%s 个月后'],
    yearsAgo: ['%s 年前', '%s 年后'],
}

const Demo: React.FC = () => {
    const [timeAgo] = useTimeAgo('2022/6/14', {
        name: 'zh-cn',
        format: zhCnformat,
    });
    return (
        <button>{timeAgo}</button>
    );
}
```

## Usage
```tsx
interface UseTimeAgoFormat {
    justNow: [string, string];
    secondsAgo: [string, string];
    minuteAgo: [string, string];
    hoursAgo: [string, string];
    daysAgo: [string, string];
    monthsAgo: [string, string];
    yearsAgo: [string, string];
}
type IDate = Date | number | string;
interface TimeAgoOptions {
    format?: UseTimeAgoFormat; // Custom local time formatting templates
    relativeDate?: IDate; // The time passed in is calculated relative to relativeDate time difference (default: current time)
    name?: string; // Custom local time formatting templates name
}

const [timeAgo, { clear, resume, start, isActive }] = useTimeAgo(
    time: IDate,
    options?: UseTimeAgoOptions
): readonly [
    string, {
        readonly clear: () => void;
        readonly resume: () => void;
        readonly start: () => void;
        readonly isActive: boolean;
    }
]
```
