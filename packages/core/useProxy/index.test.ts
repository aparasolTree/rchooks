import { act, renderHook } from '@testing-library/react-hooks';
import { useProxy } from '.';

describe('useProxy', () => {
    it('should be defined', () => {
        expect(useProxy).toBeDefined();
    });

    it('should be reactive', () => {
        const { result } = renderHook(() =>
            useProxy({ count: 10, student: [{ name: '小明', age: 20 }] })
        );
        expect(result.current.count).toBe(10);

        act(() => {
            result.current.count += 10;
        });
        expect(result.current.count).toBe(20);

        act(() => {
            result.current.student[0].age += 10;
        });
        expect(result.current.student[0].age).toBe(30);
    });

    it('should be readonly', () => {
        const { result } = renderHook(() =>
            useProxy({ count: 10, student: { name: '小明', age: 20 } }, { isReadonly: true })
        );
        expect(result.current.count).toBe(10);
        act(() => {
            result.current.count += 10;
        });
        expect(result.current.count).toBe(10);
    });

    it('should be shadow', () => {
        const { result } = renderHook(() =>
            useProxy({ count: 10, student: [{ name: '小明', age: 20 }] }, { isShallow: true })
        );
        expect(result.current.count).toBe(10);
        act(() => {
            result.current.count += 10;
        });
        expect(result.current.count).toBe(20);

        act(() => {
            result.current.student[0].age += 10;
        });
        expect(result.current.student[0].age).toBe(20);
    });

    const obj = { name: 'xl', age: 19 };
    it('Passing the same object to useProxy returns the same proxy object', () => {
        const { result: result1 } = renderHook(() => useProxy(obj));
        const { result: result2 } = renderHook(() => useProxy(obj));

        expect(result1.current).toBe(result2.current);
    });
});
