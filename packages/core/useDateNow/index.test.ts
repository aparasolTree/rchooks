import { timeout } from '@rchooks/shared';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDateNow } from '.';

describe('useDateNow', () => {
    it('Start now by default', async () => {
        const { result } = renderHook(() => useDateNow());
        const initial = result.current[0];
        await act(() => timeout(50));
        expect(result.current[0]).toBeGreaterThan(initial);
    });

    it('should be started manually', async () => {
        const { result } = renderHook(() => useDateNow({ immediate: false }));
        const initial = result.current[0];
        await act(() => timeout(50));
        expect(result.current[0]).toBe(initial);

        act(() => result.current[1].start());
        await act(() => timeout(50));
        expect(result.current[0]).toBeGreaterThan(initial);
    });
});
