import { renderHook } from '@testing-library/react-hooks';
import { useUpdateEffect } from '.';

describe('useUpdateEffect', () => {
    it('should be defined', () => {
        expect(useUpdateEffect).toBeDefined();
    });

    it('should be run effect on update', () => {
        const spy = jest.fn();

        const { rerender } = renderHook(() => useUpdateEffect(spy));

        rerender();
        expect(spy).toBeCalledTimes(1);
    });

    it('should run cleanup on unmounted', () => {
        const cleanup = jest.fn();
        const effect = jest.fn().mockReturnValue(cleanup);
        const { rerender, unmount } = renderHook(() => useUpdateEffect(effect));

        rerender();
        unmount();
        expect(cleanup).toBeCalledTimes(1);
    });
});
