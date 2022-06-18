const cacheMap = new Map<string, any>();
export const getCache = (key: string) => cacheMap.get(key);
export const setCache = (key: string, value: any) => cacheMap.set(key, value);

export const fetcherCache: Record<string, Awaited<any>> = Object.create(null);
