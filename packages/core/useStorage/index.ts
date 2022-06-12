import { useCallback, useEffect, useRef, useState } from 'react';
import guessSerializerType from './guessSerializerType';
import { Seriaizer, StroageSerializers } from './serializers';

export interface LikeStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}

export interface UseStorageOptions<T> {
    serializer?: Seriaizer<T>;
    onError?: (error: unknown) => void;
    listenOnStroageChange?: boolean;
}

export function useStorage(
    key: string,
    initialValue: string,
    stroage?: LikeStorage,
    options?: UseStorageOptions<string>
): [string, { write: (val: string) => void; remove: () => void }];
export function useStorage(
    key: string,
    initialValue: number,
    stroage?: LikeStorage,
    options?: UseStorageOptions<number>
): [number, { write: (val: number) => void; remove: () => void }];
export function useStorage(
    key: string,
    initialValue: boolean,
    stroage?: LikeStorage,
    options?: UseStorageOptions<boolean>
): [boolean, { write: (val: boolean) => void; remove: () => void }];
export function useStorage<T>(
    key: string,
    initialValue: T,
    stroage?: LikeStorage,
    options?: UseStorageOptions<T>
): [T, { write: (val: T) => void; remove: () => void }];
export function useStorage<T = unknown>(
    key: string,
    initialValue: null,
    stroage?: LikeStorage,
    options?: UseStorageOptions<T>
): [T, { write: (val: T) => void; remove: () => void }];

export function useStorage<T extends string | number | boolean | null | object>(
    key: string,
    initialValue: T,
    storage: LikeStorage | undefined,
    options: UseStorageOptions<T> = {}
) {
    const {
        serializer,
        listenOnStroageChange = true,
        onError = (e) => {
            console.error(e);
        },
    } = options;

    const [value, setValue] = useState<T | undefined>(initialValue);
    const serializerRef = useRef(serializer);
    const errorRef = useRef(onError);
    const type = guessSerializerType(value);
    serializerRef.current = serializerRef.current ?? StroageSerializers[type];

    if (!storage) {
        storage = window?.localStorage;
    }

    const read = useCallback(
        (event?: StorageEvent) => {
            if (event && event.key !== key) return;

            try {
                const rawValue = event ? event.newValue : storage?.getItem(key);
                if (rawValue == null) {
                    if (value != null) {
                        storage?.setItem(key, serializerRef.current!.write(value));
                    }
                    return value;
                } else if (typeof rawValue !== 'string') return rawValue;
                else {
                    return serializerRef.current!.read(rawValue);
                }
            } catch (error) {
                errorRef.current(error);
                return;
            }
        },
        [key, storage, value]
    );

    const write = useCallback(
        (val: T) => {
            try {
                const value = serializerRef.current!.write(val);
                storage!.setItem(key, value);
                setValue(val as T);
            } catch (error) {
                errorRef.current(error);
            }
        },
        [key, storage]
    );

    const onUpdate = useCallback(
        (event?: StorageEvent) => {
            if (event && event.key !== key) {
                return;
            }
            setValue(read(event));
        },
        [read, key]
    );

    const remove = useCallback(() => {
        try {
            storage!.removeItem(key);
            setValue(undefined);
        } catch (error) {
            errorRef.current(error);
        }
    }, [key, storage]);

    useEffect(() => {
        onUpdate();
        if (window && listenOnStroageChange) {
            window.addEventListener('storage', onUpdate);
        }
        return () => {
            if (window && listenOnStroageChange) {
                window.removeEventListener('storage', onUpdate);
            }
        };
    }, [onUpdate, listenOnStroageChange]);

    return [value, { write, remove }];
}
