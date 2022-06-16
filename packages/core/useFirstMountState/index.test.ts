import { renderHook } from '@testing-library/react-hooks';
import { useFirstMountState } from '.';

describe('useFirstMountState', () => {
    it('should be defined', () => {
        expect(useFirstMountState).toBeDefined();
    });

    it('should be true the first time', () => {
        const { result, rerender } = renderHook(() => useFirstMountState());
        expect(result.current).toBe(true);
        rerender();
        expect(result.current).toBe(false);
        rerender();
        expect(result.current).toBe(false);
    });
});
