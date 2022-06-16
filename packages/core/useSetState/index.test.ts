import { act, renderHook } from '@testing-library/react-hooks';
import { useSetState } from '.';

describe('useSetState', () => {
    it('should be defined', () => {
        expect(useSetState).toBeDefined();
    });

    it('should init state and setter', () => {
        const { result } = renderHook(() => useSetState({ name: 'xl' }));
        const [state, setState] = result.current;

        expect(state).toEqual({ name: 'xl' });
        expect(typeof setState).toBe('function');
    });

    it('if no initial state is provided, an empty state should be initialized', () => {
        const { result } = renderHook(() => useSetState());
        expect(result.current[0]).toEqual({});
    });

    it('should merge changes state', () => {
        const { result } = renderHook(() => useSetState({ name: 'xl', age: 19 }));
        act(() => result.current[1]({ age: 20 }));
        expect(result.current[0]).toEqual({ name: 'xl', age: 20 });
    });

    it('should return a memoized setState callback', () => {
        const { result, rerender } = renderHook(() => useSetState({ name: 'xl' }));
        const [, setState1] = result.current;

        act(() => {
            setState1((prev) => ({ name: prev.name + 'nb' }));
        });
        rerender();
        const [, setState2] = result.current;

        expect(setState1).toBe(setState2);
    });
});
