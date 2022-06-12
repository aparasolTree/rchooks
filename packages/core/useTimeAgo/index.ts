import { parseDate } from '../useDate';
import { useInterval } from '../useInterval';

export interface UseTimeAgoFormat {
    justNow: [string, string];
    secondsAgo: [string, string];
    minuteAgo: [string, string];
    hoursAgo: [string, string];
    daysAgo: [string, string];
    monthsAgo: [string, string];
    yearsAgo: [string, string];
}

const defaultFormat: UseTimeAgoFormat = {
    justNow: ['just now', 'a while'],
    secondsAgo: ['%s seconds ago', 'in %s seconds'],
    minuteAgo: ['%s minutes ago', 'in %s minutes'],
    hoursAgo: ['%s hours ago', 'in %s hours'],
    daysAgo: ['%s days ago', 'in %s days'],
    monthsAgo: ['%s months ago', 'in %s months'],
    yearsAgo: ['%s years ago', 'in %s years'],
};

export type DateFormat = Record<keyof UseTimeAgoFormat, { min: number; max: number }>;
const DataRange: DateFormat = {
    justNow: { min: 0, max: 1 },
    secondsAgo: { min: 1, max: 60 },
    minuteAgo: { min: 60, max: 3600 },
    hoursAgo: { min: 3600, max: 86400 },
    daysAgo: { min: 86400, max: 2592000 },
    monthsAgo: { min: 2592000, max: 31104000 },
    yearsAgo: { min: 31104000, max: Infinity },
};

export interface TimeAgoOptions {
    format?: UseTimeAgoFormat;
    relativeDate?: IDate;
}

export interface UseTimeAgoOptions extends TimeAgoOptions {
    updateDelay?: number;
}

export type IDate = Date | number | string;

function diffSeconds(date: IDate, relDate?: IDate): number {
    const relativeDate = relDate ? parseDate(relDate) : new Date();
    return (Number(parseDate(date)) - Number(relativeDate)) / 1000;
}

const Locales: Record<string, UseTimeAgoFormat> = Object.create(null);
const register = (localeName: string, locale: UseTimeAgoFormat) => {
    Locales[localeName] = locale;
};
const getLocale = (localName?: string) => {
    return (localName && Locales[localName]) || defaultFormat;
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

function format(date: IDate, localeName?: string, options?: TimeAgoOptions) {
    const diffSec = diffSeconds(date, options?.relativeDate);
    return formatDiff(diffSec, getLocale(localeName));
}

export function useTimeAgo(time: IDate, options: UseTimeAgoOptions = {}) {
    const { updateDelay = 3000 } = options;
    const [isActive, controls] = useInterval(updateDelay);
    return [format(time), { isActive, ...controls }] as const;
}
