import { renderHook } from '@testing-library/react-hooks';
import { useDate } from '.';

describe('useDate', () => {
    it('should be with default', () => {
        const { result, rerender } = renderHook<{ date: Date | string | number }, string>(
            ({ date }) => useDate(date),
            {
                initialProps: { date: new Date('2020/6/16') },
            }
        );
        expect(result.current).toBe('2020-06-16 00:00:00 000');

        rerender({ date: '2222-2-2 22:22:22' });
        expect(result.current).toBe('2222-02-02 22:22:22 000');

        rerender({ date: 1655308800000 });
        expect(result.current).toBe('2022-06-16 00:00:00 000');
    });

    it('should be with YY-M-D', () => {
        const { result } = renderHook(() => useDate('2022-6-16', 'YY-M-D'));
        expect(result.current).toBe('22-6-16');
    });

    it('should be with YYYY-MM-DD', () => {
        const { result } = renderHook(() => useDate('2022-6-16', 'YYYY-MM-DD'));
        expect(result.current).toBe('2022-06-16');
    });

    it('should be with H:m:s', () => {
        const { result } = renderHook(() => useDate('2022-6-16 13:30:05', 'H:m:s'));
        expect(result.current).toBe('13:30:5');
    });

    it('should be with HH:mm:ss', () => {
        const { result } = renderHook(() => useDate('2022-6-16 13:30:05', 'HH:mm:ss'));
        expect(result.current).toBe('13:30:05');
    });

    it('should be with h:m:s', () => {
        const { result } = renderHook(() => useDate('2022-6-16 13:30:05', 'h:m:s'));
        expect(result.current).toBe('1:30:5');
    });

    it('should be with hh:mm:ss', () => {
        const { result } = renderHook(() => useDate('2022-6-16 13:30:05', 'hh:mm:ss'));
        expect(result.current).toBe('01:30:05');
    });

    it('should be with hh:mm:ss SSS', () => {
        const { result } = renderHook(() => useDate('2022-6-16 13:30:05', 'hh:mm:ss SSS'));
        expect(result.current).toBe('01:30:05 000');
    });
});
