import { renderHook } from '@testing-library/react-hooks';
import { useUnmount } from '.';

describe('useUnmount', () => {
    it('should be defined', () => {
        expect(useUnmount).toBeDefined();
    });

    it('should be executed when the component is unmounted', () => {
        const spy = jest.fn();
        const { unmount } = renderHook(() => useUnmount(spy));
        expect(spy).not.toBeCalled();
        unmount();
        expect(spy).toBeCalledTimes(1);
    });
});
