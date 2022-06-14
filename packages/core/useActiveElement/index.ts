import { isBrowser } from '@rchooks/shared';
import { useEffect, useState } from 'react';

export function useActiveElement() {
    const [activeElement, setActiveElement] = useState(document?.activeElement);

    useEffect(() => {
        if (!isBrowser) return;
        const handler = () => setActiveElement(document?.activeElement);
        window.addEventListener('focus', handler);

        return () => {
            window.removeEventListener('blur', handler);
        };
    }, []);

    return activeElement;
}
