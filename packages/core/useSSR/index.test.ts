import { renderHook } from '@testing-library/react-hooks';
import { useSSR } from '.';

describe('useSSR', () => {
    it('should be defined', () => {
        expect(useSSR).toBeDefined();
    });

    it('should be borwser', () => {
        const { result } = renderHook(() => useSSR());
        expect(result.current.isServer).toBe(false);
        expect(result.current.isNative).toBe(false);
        expect(result.current.isBrowser).toBe(true);
    });
});
