import { useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useMount } from '../useMount';
import { genRangeRandom, hyphenate, isBrowser } from '@rchooks/shared';
import style from './config';

let id = 0;
const str = 'zxcvbnmasdfghjklqwertyuiop';

const createUniqueId = () => {
    let result = '';
    for (let i = 0; i < 16; i++) result += str[genRangeRandom(0, str.length - 1)];
    return `${result}-${id++}`;
};

const normalizeStyle = <C extends CSSProperties, D extends keyof C>(
    className: string,
    cssRules: C,
    deps: D[]
) => {
    let styleText = `.${className} {`;
    const depNodes: Record<string, Node> = Object.create(null);

    Object.entries(cssRules).forEach(([key, value]) => {
        if (deps.includes(key as any)) {
            style!.append(document.createTextNode(styleText + `${hyphenate(key)}: `));
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

export function useStyle<C extends CSSProperties, D extends keyof C>(cssRules: C, deps: D[] = []) {
    const classNameRef = useRef<string>(createUniqueId());
    const depNodesRef = useRef<Record<string, Node>>({});
    const depMap = useRef(Object.fromEntries(deps.map((d) => [d, cssRules[d]])) as Record<D, C[D]>);

    const setStyle = useCallback(
        (
            styleMap:
                | Partial<Record<D, C[D]>>
                | ((prevStyle: Record<D, C[D]>) => Partial<Record<D, C[D]>>)
        ) => {
            if (depNodesRef.current) {
                const s = typeof styleMap === 'function' ? styleMap(depMap.current) : styleMap;
                for (const [key, value] of Object.entries(depNodesRef.current)) {
                    const _v = s[key];
                    if (_v) {
                        value.textContent = s[key];
                    }
                }
                depMap.current = { ...depMap.current, ...s };
            }
        },
        []
    );

    useMount(() => {
        if (!isBrowser) return;
        const [style, depNodes] = normalizeStyle(classNameRef.current, cssRules, deps);
        depNodesRef.current = depNodes;
        document.head.append(style!);
    });

    return [classNameRef.current, setStyle] as const;
}
