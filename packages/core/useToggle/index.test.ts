import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from '.';

describe('useToggle', () => {
    it('should be defined', () => {
        expect(useToggle).toBeDefined();
    });

    it('should be default value', () => {
        const { result } = renderHook(() => useToggle());

        expect(result.current[0]).toBe(false);
    });

    it('should be initial value', () => {
        const { result } = renderHook(() => useToggle(true));

        expect(result.current[0]).toBe(true);
        act(() => result.current[1]());
        expect(result.current[0]).toBe(false);
    });

    it('should be 0 or 1', () => {
        const { result } = renderHook(() => useToggle(0, { truthValue: 1, falseValue: 0 }));

        expect(result.current[0]).toBe(0);
        act(() => result.current[1]());
        expect(result.current[0]).toBe(1);
    });

    it('The value passed in must be true of false', () => {
        const { result } = renderHook(() => useToggle(false));

        // @ts-ignore
        act(() => result.current[1](132));
        expect(result.current[0]).toBe(false);
    });
});
