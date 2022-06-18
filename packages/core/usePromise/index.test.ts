import { timeout } from '@rchooks/shared';
import { act, renderHook } from '@testing-library/react-hooks';
import { usePromise } from '.';

function fetcher<T extends unknown>(result: T, delay: number = 1000) {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(result), delay);
    });
}

function fetcherError<T extends unknown>(result: T, delay: number = 1000) {
    return new Promise<T>((_, reject) => {
        setTimeout(() => reject(result), delay);
    });
}

describe('usePromise', () => {
    it('should be defined', () => {
        expect(usePromise).toBeDefined();
    });

    it('should be return 100', async () => {
        const { result } = renderHook(() => usePromise(fetcher(100, 5)));
        await act(() => timeout(100));
        expect(result.current[0]).toBe(100);
    });

    it('should not be executed immediately on mount', async () => {
        const { result } = renderHook(() => usePromise(fetcher(100, 5), { immediate: false }));
        await act(() => timeout(100));
        expect(result.current[0]).toBe(undefined);
    });

    it('error callbacks should be invoked', async () => {
        const spy = jest.fn();
        renderHook(() => usePromise(fetcherError(100, 5), { onError: spy }));
        await act(() => timeout(100));
        expect(spy).toBeCalled();
    });
});
