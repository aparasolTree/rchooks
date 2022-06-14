import { defaultFormat, UseTimeAgoFormat } from './format';

const Locales: Record<string, UseTimeAgoFormat> = Object.create(null);
export const register = (localeName: string, locale: UseTimeAgoFormat) => {
    Locales[localeName] = locale;
};

export const getLocale = (localName?: string) => {
    return (localName && Locales[localName]) || defaultFormat;
};
