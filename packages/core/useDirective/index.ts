import { Fn } from '@rchooks/shared';
import React, { useEffect, useRef } from 'react';
import { Direction, DirectionBind, directives } from './lib/directives';

export function useDirective<E extends Element = Element, D extends any = any>(
    dir: string,
    depValue?: D
): React.RefObject<E>;
export function useDirective<E extends Element = Element, D extends any = any>(
    dir: Direction,
    depValue: D
): React.RefObject<E>;

export function useDirective<E extends Element = Element, D extends any = any>(
    dir: string,
    depValue?: D
) {
    const ref = useRef<E>(null);
    useEffect(() => {
        const cancelEffect = directives[dir]?.(ref.current, { content: depValue });
        return () => {
            cancelEffect && cancelEffect();
        };
    }, [depValue, dir]);
    return ref;
}

useDirective.register = (
    directiveName: string,
    callback: (el: Element, bind: DirectionBind) => Fn
) => {
    if (!/^r-/.test(directiveName)) {
        throw new Error('[useDirective.register]: Directives must start with r-');
    }

    if (!directives[directiveName]) {
        directives[directiveName] = callback;
    }
};
