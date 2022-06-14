import { parseDate } from '../../useDate';
import { getLocale } from './locales';

export interface UseTimeAgoFormat {
    justNow: [string, string];
    secondsAgo: [string, string];
    minuteAgo: [string, string];
    hoursAgo: [string, string];
    daysAgo: [string, string];
    monthsAgo: [string, string];
    yearsAgo: [string, string];
}
export type IDate = Date | number | string;
export type DateFormat = Record<keyof UseTimeAgoFormat, { min: number; max: number }>;
export interface TimeAgoOptions {
    format?: UseTimeAgoFormat;
    relativeDate?: IDate;
    name?: string;
}

export const defaultFormat: UseTimeAgoFormat = {
    justNow: ['just now', 'a while'],
    secondsAgo: ['%s seconds ago', 'in %s seconds'],
    minuteAgo: ['%s minutes ago', 'in %s minutes'],
    hoursAgo: ['%s hours ago', 'in %s hours'],
    daysAgo: ['%s days ago', 'in %s days'],
    monthsAgo: ['%s months ago', 'in %s months'],
    yearsAgo: ['%s years ago', 'in %s years'],
};

const DataRange: DateFormat = {
    justNow: { min: 0, max: 1 },
    secondsAgo: { min: 1, max: 60 },
    minuteAgo: { min: 60, max: 3600 },
    hoursAgo: { min: 3600, max: 86400 },
    daysAgo: { min: 86400, max: 2592000 },
    monthsAgo: { min: 2592000, max: 31104000 },
    yearsAgo: { min: 31104000, max: Infinity },
};

const SEC_ARRAY = [60, 60, 24, 30, 12];

function formatDiff(diff: number, locale: UseTimeAgoFormat) {
    const isAgo = diff < 0 ? 0 : 1;
    diff = Math.abs(diff);
    let result = '';
    Object.entries(DataRange).forEach(([key, value]) => {
        if (diff <= value.max && diff > value.min) {
            for (let i = 0; diff >= SEC_ARRAY[i] && i < SEC_ARRAY.length; i++) {
                diff /= SEC_ARRAY[i];
            }
            diff = Math.floor(diff);
            result = locale[key][isAgo].replace('%s', diff.toString());
        }
    });

    return result;
}

function diffSeconds(date: IDate, relDate?: IDate): number {
    const relativeDate = relDate ? parseDate(relDate) : new Date();
    return (Number(parseDate(date)) - Number(relativeDate)) / 1000;
}

export function format(date: IDate, localeName?: string, options?: TimeAgoOptions) {
    const diffSec = diffSeconds(date, options?.relativeDate);
    return formatDiff(diffSec, getLocale(localeName));
}
