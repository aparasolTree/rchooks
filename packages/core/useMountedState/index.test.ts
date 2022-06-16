import { renderHook } from '@testing-library/react-hooks';
import { useMountedState } from '.';

describe('useMountedState', () => {
    it('should be defined', () => {
        expect(useMountedState).toBeDefined();
    });

    it('shouold be true after the component is mounted', () => {
        const { result, rerender, unmount } = renderHook(() => useMountedState());
        expect(result.current()).toBe(true);
        rerender();
        expect(result.current()).toBe(true);
        rerender();
        expect(result.current()).toBe(true);
        unmount();
        expect(result.current()).toBe(false);
    });
});
