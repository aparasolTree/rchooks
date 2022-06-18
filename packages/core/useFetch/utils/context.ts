import { createContext, useContext } from 'react';
import { Fetcher } from '..';

export interface UseFetchContext {
    baseUrl?: string;
    fetcher?: Fetcher<any>;
}

const FetchContext = createContext<UseFetchContext>({});

export const FetchConfig = FetchContext.Provider;
export const useFetchContext = () => useContext(FetchContext);
