import { act, renderHook } from '@testing-library/react-hooks';
import { useCounter } from '.';

describe('useCounter', () => {
    it('should be initial value', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current[0]).toBe(0);
    });

    it('should be update counter', () => {
        const { result } = renderHook(() => useCounter(0));

        act(() => result.current[1].inc());
        expect(result.current[0]).toBe(1);

        act(() => result.current[1].inc(-1));
        expect(result.current[0]).toBe(2);

        act(() => result.current[1].inc(4));
        expect(result.current[0]).toBe(6);

        act(() => result.current[1].dec(-4));
        expect(result.current[0]).toBe(2);

        act(() => result.current[1].dec(2));
        expect(result.current[0]).toBe(0);

        act(() => result.current[1].set(100));
        expect(result.current[0]).toBe(100);

        act(() => result.current[1].reset());
        expect(result.current[0]).toBe(0);
    });
});
