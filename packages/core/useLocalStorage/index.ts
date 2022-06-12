import { useStorage, UseStorageOptions } from '../useStorage';

export function useLocalStorage<T extends string | number | boolean | object | null>(
    key: string,
    value: T,
    options: UseStorageOptions<T> = {}
) {
    return useStorage(key, value, localStorage, options);
}
