# useTimeAgo

响应时间前后

## 用法

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

## 参考
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
    format?: UseTimeAgoFormat; // 自定义本地时间格式化模板
    relativeDate?: IDate; // 传入的时间相对于 relativeDate 进行计算 时间差 （默认为 : 当前时间）
    name?: string; // 自定义本地时间格式化模板名称
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
