import { isBrowser } from '@rchooks/shared';
import { useCallback, useEffect, useRef } from 'react';

export interface UseTitleOptions {
    restoreOnUnmounted?: boolean;
    titleTempalte?: string;
}

// react 18 中 React.StrictMode 下组件会渲染两次，用 useRef 保存 title 将不是更改前的title，而是第一次更改后的 title
let initialTitle = document.title; // 用来保存更改前的 title
export function useTitle(title: string, options: UseTitleOptions = {}) {
    const { restoreOnUnmounted = false, titleTempalte = '%s' } = options;
    const canIChange = useRef<boolean>(true);

    useEffect(() => {
        if (isBrowser && document.title !== title && canIChange.current) {
            document.title = titleTempalte.replace('%s', title);
        }
        return () => {
            // 虽然 title 参数值变化， 都会执行一次将 document.title 修改为初始值，但是页面效果看不出来 😄
            if (isBrowser && restoreOnUnmounted) {
                document.title = initialTitle;
            }
        };
    }, [restoreOnUnmounted, title, titleTempalte]);

    return useCallback(() => (canIChange.current = false), []);
}
