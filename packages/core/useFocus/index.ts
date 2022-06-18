import { isDef, unRef } from '@rchooks/shared';
import { RefObject, useMemo } from 'react';
import { useActiveElement } from '../useActiveElement';

export function useFocus(target: RefObject<Element> | Window | Document) {
    const activeElement = useActiveElement();
    return useMemo(() => {
        const origin = unRef<Element | Window | Document>(target);
        const focused = isDef(activeElement) && isDef(origin) && activeElement === origin;

        return [
            focused,
            (newVal: boolean) => {
                if (newVal && !focused) {
                    (origin as HTMLElement)?.focus();
                } else if (!newVal && focused) {
                    (origin as HTMLElement)?.blur();
                }
            },
        ];
    }, [activeElement, target]);
}
