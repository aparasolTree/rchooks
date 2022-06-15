import { useMemo } from 'react';

export type DateLike = Date | number | string | undefined;

const PARSE_DATE_RE =
    /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{1,2})\s*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;

const FORMAT_DATE = /Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

export const parseDate = (date: DateLike) => {
    if (date == null) return new Date();
    if (typeof date === 'string') {
        const match = date.match(PARSE_DATE_RE);
        if (match) {
            const month = Number(match[2]) - 1 || 0;
            const millisecond = (Number(match[7]) || 0).toFixed(3);
            return new Date(
                +match[1],
                month,
                +match[3] || 1,
                +match[4] || 0,
                +match[5] || 0,
                +match[6] || 0,
                +millisecond
            );
        }
    }

    return new Date(date);
};

export const formatDate = (date: Date, format: string) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDay();
    const seconds = date.getSeconds();
    const milliscends = date.getMilliseconds();
    const matches = {
        YY: `${year}`.slice(-2),
        YYYY: year,
        M: month + 1,
        MM: `${month + 1}`.padStart(2, '0'),
        D: days,
        DD: `${days}`.padStart(2, '0'),
        H: hours,
        HH: `${hours}`.padStart(2, '0'),
        h: `${hours % 12 || 12}`,
        hh: `${hours % 12 || 12}`.padStart(2, '0'),
        m: minutes,
        mm: `${minutes}`.padStart(2, '0'),
        s: seconds,
        ss: `${seconds}`.padStart(2, '0'),
        SSS: `${milliscends}`.padStart(3, '0'),
        d: day,
    };

    return format.replace(FORMAT_DATE, (match) => matches[match]);
};

export function useDate(date: DateLike, format: string = 'YYYY-MM-DD HH:mm:ss SSS') {
    return useMemo(() => formatDate(parseDate(date), format), [date, format]);
}
