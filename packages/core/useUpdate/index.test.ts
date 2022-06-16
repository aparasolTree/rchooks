import { act, renderHook } from '@testing-library/react-hooks';
import { useUpdate } from '.';

describe('uesUpdate', () => {
    it('should be defined', () => {
        expect(useUpdate).toBeDefined();
    });

    it('should return a function', () => {
        const { result } = renderHook(() => useUpdate());

        expect(typeof result.current).toBe('function');
    });

    it('The function re-renders the component every time it executes', () => {
        let renders = 0;
        const { result } = renderHook(() => {
            renders++;
            return useUpdate();
        });

        expect(renders).toBe(1);
        act(() => result.current());
        expect(renders).toBe(2);

        act(() => result.current());
        expect(renders).toBe(3);
    });

    it('Multiple re-renders return the same function', () => {
        let renders = 0;
        const { result } = renderHook(() => {
            renders++;
            return useUpdate();
        });
        let initialUpdateFn = result.current;

        act(() => result.current());
        expect(renders).toBe(2);
        expect(initialUpdateFn).toBe(result.current);

        act(() => result.current());
        expect(renders).toBe(3);
        expect(initialUpdateFn).toBe(result.current);
    });
});
