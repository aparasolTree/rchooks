import { isBrowser } from '@rchooks/shared';
import { useEffect, useRef } from 'react';
import { useUpdate } from '../useUpdate';

function getRangesFromSelection(selection: Selection) {
    const rangeCount = selection.rangeCount ?? 0;
    const ranges = Array.from<Range>({ length: rangeCount });
    for (let i = 0; i < rangeCount; i++) {
        const range = selection.getRangeAt(i);
        ranges[i] = range;
    }
    return ranges;
}

export function useTextSelection() {
    const selection = useRef<Selection>(window.getSelection());
    const text = () => selection.current?.toString() ?? '';
    const ranges = () => (selection.current ? getRangesFromSelection(selection.current!) : []);
    const rects = () => ranges().map((range) => range.getBoundingClientRect());
    const update = useUpdate();

    useEffect(() => {
        const onSelctionChange = () => isBrowser && update();

        document.addEventListener('selectionchange', onSelctionChange);
        return () => {
            if (isBrowser) {
                document.removeEventListener('selectionchange', onSelctionChange);
            }
        };
    }, [update]);

    return { text, ranges, rects, selection };
}
