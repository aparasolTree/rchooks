import { Rules } from '../types';
import en from './en.json';
import zh_cn from './zh-cn.json';

const all: Record<string, Record<Rules, string>> = {
    en,
    zh_cn,
};

export function registerLocale(name: string, errorInfo: Record<Rules, string>) {
    const isExists = all[name];
    if (!isExists) all[name] = errorInfo;
}

export default all;
