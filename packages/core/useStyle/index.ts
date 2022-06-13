import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useMount } from '../useMount';
import { genRangeRandom, hyphenate, isBrowser } from '@r-hooks/shared';
import { useUpdateEffect } from '../useUpdateEffect';
import style from './config';

let id = 0;
const str = 'zxcvbnmasdfghjklqwertyuiop';

const createUniqueId = () => {
    let result = '';
    for (let i = 0; i < 16; i++) result += str[genRangeRandom(0, str.length - 1)];
    return `${result}-${id++}`;
};

const normalizeStyle = (className: string, cssRules: CSSProperties, deps: string[]) => {
    let styleText = `.${className} {`;
    const depNodes: Record<string, Node> = Object.create(null);

    Object.entries(cssRules).forEach(([key, value]) => {
        if (deps.includes(key)) {
            style!.append(document.createTextNode(styleText + `${hyphenate(key)}: `));
            console.log(styleText + `${hyphenate(key)}: `);
            styleText = '';
            depNodes[key] = document.createTextNode(`${value}`);
            styleText += ';';
            style!.append(depNodes[key]);
        } else {
            styleText += `${hyphenate(key)}: ${value};`;
        }
    });

    styleText += '}';
    style!.append(document.createTextNode(styleText));
    return [style, depNodes] as const;
};

export function useStyle(cssRules: CSSProperties, deps: string[] = []) {
    const classNameRef = useRef<string>(createUniqueId());
    const depNodesRef = useRef<Record<string, Node>>({});
    const prevCSSRules = useRef<CSSProperties>({});

    useMount(() => {
        if (!isBrowser) return;
        const [style, depNodes] = normalizeStyle(classNameRef.current, cssRules, deps);
        depNodesRef.current = depNodes;
        document.head.append(style!);

        prevCSSRules.current = cssRules;
    });

    useUpdateEffect(() => {
        for (const key in cssRules) {
            if (cssRules[key] !== prevCSSRules.current[key] && deps.includes(key)) {
                depNodesRef.current[key].textContent = cssRules[key];
            }
        }
        console.log(depNodesRef.current);
        prevCSSRules.current = cssRules;
    });

    return classNameRef.current;
}
