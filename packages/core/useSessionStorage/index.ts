import { useStorage, UseStorageOptions } from '../useStorage';

export function useSessionStorage<T extends string | number | boolean | object | null>(
    key: string,
    value: T,
    options: UseStorageOptions<T> = {}
) {
    return useStorage(key, value, sessionStorage, options);
}
