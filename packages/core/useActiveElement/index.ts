import { isBrowser } from '@rchooks/shared';
import { useEffect, useState } from 'react';

export function useActiveElement() {
    const [activeElement, setActiveElement] = useState(document?.activeElement);

    useEffect(() => {
        if (!isBrowser) return;
        const handler = () => setActiveElement(document?.activeElement);
        window.addEventListener('focus', handler, true);
        window.addEventListener('blur', handler, true);

        return () => {
            window.removeEventListener('focus', handler, true);
            window.removeEventListener('blur', handler, true);
        };
    }, []);

    return activeElement;
}
