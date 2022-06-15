import { renderHook, act } from '@testing-library/react-hooks';
import { useClamp } from '.';

const setup = (cur: number, min: number, max: number) =>
    renderHook<{ cur: number; min: number; max: number }, ReturnType<typeof useClamp>>(
        ({ cur, min, max }) => useClamp(cur, min, max),
        {
            initialProps: {
                cur,
                min,
                max,
            },
        }
    );

describe('useClamp', () => {
    it('should be initial value', () => {
        const { result } = setup(0, 1, 1000);
        expect(result.current[0]).toBe(1);
    });

    it('should be max', () => {
        const { result } = setup(10000, 10, 100);

        expect(result.current[0]).toBe(100);
        const [, setCount] = result.current;

        act(() => setCount(10000));
        expect(result.current[0]).toBe(100);
    });

    it('should be min', () => {
        const { result } = setup(10, 20, 100);
        expect(result.current[0]).toBe(20);
        const [, setCount] = result.current;

        act(() => setCount(-2));
        expect(result.current[0]).toBe(20);
    });
});
