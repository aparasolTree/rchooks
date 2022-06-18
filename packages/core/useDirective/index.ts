import { Fn } from '@rchooks/shared';
import React, { DependencyList, useEffect, useRef } from 'react';
import { useLatest } from '../useLatest';
import { Direction, DirectionBind, directives } from './lib/directives';

export function useDirective<E extends Element = Element, D extends any = any>(
    dir: string,
    depValue?: D,
    deps?: DependencyList
): React.RefObject<E>;
export function useDirective<E extends Element = Element, D extends any = any>(
    dir: Direction,
    depValue: D,
    deps?: DependencyList
): React.RefObject<E>;

export function useDirective<E extends Element = Element, D extends any = any>(
    dir: string,
    depValue?: D,
    deps?: DependencyList
) {
    const ref = useRef<E>(null);
    const oldValue = useRef<D>();
    const depValueRef = useLatest<D | undefined>(depValue);

    useEffect(() => {
        const cancelEffect = directives[dir]?.(ref.current, {
            value: depValueRef.current,
            oldValue,
            name: dir,
        });

        oldValue.current = depValueRef.current;
        return () => {
            cancelEffect && cancelEffect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...(deps || []), dir]);
    return ref;
}

useDirective.register = (
    directiveName: string,
    callback: (el: Element, bind: DirectionBind) => Fn
) => {
    if (!/^r-/.test(directiveName)) {
        throw new Error('[useDirective.register]: Directives must start with r-');
    }

    if (directives[directiveName]) {
        console.warn(`[useDirective.register]: ${directiveName} directive already exists`);
        return;
    }

    directives[directiveName] = callback;
};
