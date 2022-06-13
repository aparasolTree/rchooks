import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';
import { useSetState } from '../useSetState';
import { hyphenate } from '@r-hooks/shared';

export type Props<P extends string | number | symbol> = Partial<Record<P, string>>;

export function useCSSVar<P extends keyof CSSProperties>(
    target: React.RefObject<HTMLElement>,
    props: Array<P>
) {
    const [variables, _setVariables] = useSetState<Props<P>>({});
    const prevValue = useRef<Props<P>>({});

    const setVariables = useCallback(
        (props: Props<P> | ((prevProps: Props<P>) => Props<P>)) => {
            _setVariables((variables) => {
                let property = typeof props === 'function' ? props(variables) : props;
                return Object.fromEntries(
                    Object.entries(property).map(([key, val]) => [key, val])
                ) as Props<P>;
            });
        },
        [_setVariables]
    );

    useEffect(() => {
        if (target.current && window) {
            const getComputedStyle = window.getComputedStyle(target.current);
            props.forEach((prop) => {
                const normalized = hyphenate(prop);
                const value = getComputedStyle.getPropertyValue(normalized);
                setVariables((props) => ({ ...props, [prop]: value }));
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(props), setVariables]);

    useEffect(() => {
        if (target.current?.style) {
            const prev = prevValue.current;
            for (const prop in variables) {
                if (variables[prop] !== prev[prop]) {
                    target.current.style.setProperty(hyphenate(prop), variables[prop]!);
                }
            }
        }
        prevValue.current = variables;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(variables)]);

    return [variables, { setVariables }] as const;
}
