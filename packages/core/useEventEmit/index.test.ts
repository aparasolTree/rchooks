import { act, renderHook } from '@testing-library/react-hooks';
import { useEventEmit } from '.';

describe('useEventEmit', () => {
    it('should be defined', () => {
        expect(useEventEmit).toBeDefined();
    });

    it('should be called', () => {
        const { result } = renderHook(() => useEventEmit('test'));
        const spy = jest.fn();
        act(() => result.current.addListener(spy));
        act(() => result.current.disPatch());

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should be cancel', () => {
        const { result } = renderHook(() => useEventEmit('test'));
        const spy = jest.fn();
        act(() => result.current.addListener(spy));
        act(() => result.current.removeListener(spy));
        act(() => result.current.disPatch());

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should be called once', () => {
        const { result: result1 } = renderHook(() => useEventEmit('test-event'));
        const { result: result2 } = renderHook(() => useEventEmit('test-event'));
        const spy = jest.fn();

        act(() => result1.current.addListener(spy));
        act(() => result2.current.addListener(spy));

        act(() => result1.current.disPatch());

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should all be called', () => {
        const { result: result1 } = renderHook(() => useEventEmit('test-event'));
        const { result: result2 } = renderHook(() => useEventEmit('test-event'));
        const spy1 = jest.fn();
        const spy2 = jest.fn();

        act(() => result1.current.addListener(spy1));
        act(() => result2.current.addListener(spy2));

        act(() => result1.current.disPatch());

        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('The function should be canceled when the component is unmounted', () => {
        const { result: result1 } = renderHook(() => useEventEmit('test-event'));
        const { result: result2, unmount } = renderHook(() => useEventEmit('test-event'));
        const spy1 = jest.fn();
        const spy2 = jest.fn();

        act(() => result1.current.addListener(spy1));
        act(() => result2.current.addListener(spy2));
        unmount();
        act(() => result1.current.disPatch());

        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).not.toHaveBeenCalled();
    });
});
