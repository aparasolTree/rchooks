import { isDef, isFunction, isObject } from '@rchooks/shared';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { fetcherCache, getCache, setCache } from './utils/cache';
import { useFetchContext, UseFetchContext } from './utils/context';

export type Fetcher<D> = (url?: string) => Promise<D>;

export interface UseFetchOptions<Data, Error> extends UseFetchContext {
    immediate?: boolean;
    onSuccess?: (data: Data, key: string, config: UseFetchOptions<Data, Error>) => void;
    onError?: (error: Error, key: string, config: UseFetchOptions<Data, Error>) => void;
    onLoadingSlow?: (key: string, config: UseFetchOptions<Data, Error>) => void;
    timeout?: number;
}

export type Key = string | (() => string);
export interface UseFetchReturn<Data, Error> {
    data?: Data;
    error?: Error;
    reFetch?: () => Promise<boolean>;
    isLoading?: boolean;
}

export function useFetch<Data = any, Error = any>(key: Key): UseFetchReturn<Data, Error>;
export function useFetch<Data = any, Error = any>(
    key: Key,
    options: UseFetchOptions<Data, Error>
): UseFetchReturn<Data, Error>;
export function useFetch<Data = any, Error = any>(
    key: Key,
    fetcher: Fetcher<Data>,
    options?: UseFetchOptions<Data, Error>
): UseFetchReturn<Data, Error>;

export function useFetch<Data = any, Error = any>(...args: any[]) {
    let _key: Key = '',
        fetcher: Fetcher<Data> | undefined,
        config: UseFetchOptions<Data, Error> = {};

    if (args.length >= 1) _key = args[0];

    if (isFunction(args[1])) fetcher = args[1];
    else if (isObject(args[1])) config = args[1];

    if (isObject(args[2])) config = args[2];

    let key: string = '';
    if (isFunction(_key)) {
        try {
            key = _key();
        } catch (error) {
            key = '';
        }
    } else key = _key;
    config = Object.assign({}, useFetchContext(), config);
    key = config.baseUrl + key;
    if (!isDef(fetcher)) fetcher = config.fetcher;

    const [data, setData] = useState<Data>(getCache(key));
    const [error, setError] = useState<Error>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const unmountedRef = useRef(false);
    const configRef = useRef(config);
    const fetcherRef = useRef(fetcher);

    const execute = useCallback(async () => {
        if (!key || unmountedRef.current) return false;
        let loading = true,
            config = configRef.current;

        try {
            setLoading(loading);
            let newData: any;
            const originRequest = !!(fetcherCache[key] !== undefined);

            if (originRequest) {
                newData = await fetcherCache[key];
            } else {
                if (!getCache(key)) {
                    setTimeout(() => {
                        loading && config.onLoadingSlow?.(key, config);
                    }, config.timeout);
                }
                fetcherCache[key] = fetcherRef.current!(key);
                newData = await fetcherCache[key];
                config.onSuccess?.(newData, key, config);
            }

            setLoading(false);
            setError(undefined);
            setData(newData);
            setCache(key, newData);
        } catch (error) {
            delete fetcherCache[key];
            setLoading(false);
            setError(error as Error);
            config.onError?.(error as Error, key, config);
        }
        loading = false;
        return true;
    }, [key]);

    const reFetch = useCallback(() => execute(), [execute]);

    useLayoutEffect(() => {
        if (!key) return;
        unmountedRef.current = false;
        const _newData = getCache(key);
        if (_newData) setData(_newData);

        execute();

        return () => {
            unmountedRef.current = true;
        };
    }, [key, execute]);

    return { data, isLoading, error, reFetch };
}
