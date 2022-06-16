import { renderHook } from '@testing-library/react-hooks';
import { useMount } from '.';

describe('useMount', () => {
    it('should be defined', () => {
        expect(useMount).toBeDefined();
    });

    it('should be executed at mount time', () => {
        const spy = jest.fn();
        const { rerender } = renderHook(() => useMount(spy));
        expect(spy).toBeCalledTimes(1);
        rerender();
        expect(spy).toBeCalledTimes(1);
        rerender();
        expect(spy).toBeCalledTimes(1);
    });
});
