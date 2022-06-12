import { useReducer } from 'react';

export function useUpdate() {
    const [, update] = useReducer((state) => state + 1, 0);
    return update;
}
