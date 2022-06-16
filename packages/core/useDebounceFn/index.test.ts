import { DebounceOptions } from '@rchooks/shared';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDebounceFn } from '.';

describe('useDebounceFn', () => {
    beforeAll(() => jest.useFakeTimers());
    afterEach(() => jest.clearAllTimers());
    afterAll(() => jest.useRealTimers());

    it('should be defined', () => {
        expect(useDebounceFn).toBeDefined();
    });

    it('should return a function', () => {
        const { result } = renderHook(() => useDebounceFn(() => {}, 10));

        expect(typeof result.current).toBe('function');
    });

    function getHook(ms: number = 5, options: DebounceOptions = {}) {
        const spy = jest.fn();
        return [
            spy,
            renderHook(({ ms, options }) => useDebounceFn(spy, ms, options), {
                initialProps: { ms, options },
            }),
        ] as const;
    }

    it('should be canceled on unmount', () => {
        const [spy, hook] = getHook(5, { immediate: false });

        expect(spy).not.toBeCalled();
        act(() => hook.result.current());
        hook.unmount();
        jest.advanceTimersByTime(5);
        expect(spy).not.toBeCalled();
    });
});
