import { act, renderHook } from '@testing-library/react-hooks';
import { useIntervalFn, UseIntervalFnOptions } from '.';

describe('useIntervalFn', () => {
    beforeAll(() => jest.useFakeTimers());
    afterEach(() => jest.clearAllTimers());
    afterAll(() => jest.useRealTimers());

    it('should be defined', () => {
        expect(useIntervalFn).toBeDefined();
    });

    function getHook(ms: number = 5, options: UseIntervalFnOptions = {}) {
        const spy = jest.fn();
        return [
            spy,
            renderHook(({ ms, options }) => useIntervalFn(spy, ms, options), {
                initialProps: { ms, options },
            }),
        ] as const;
    }

    it('should be executed immediately upon mount ', () => {
        const [spy] = getHook();
        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
    });

    it('should be canceled on unmount', () => {
        const [spy, hook] = getHook(5, { immediate: false, immediateCallback: false });

        expect(spy).not.toBeCalled();
        act(() => hook.result.current[1].start());
        hook.unmount();
        jest.advanceTimersByTime(5);
        expect(spy).not.toBeCalled();
    });
});
