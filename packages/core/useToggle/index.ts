import { useCallback, useState } from 'react';

export interface UseToggleOptions<Truth, False> {
    truthValue?: Truth;
    falseValue?: False;
}

export function useToggle<Truth = true, False = false, T extends Truth | False = Truth | False>(
    initialValue: T,
    options?: UseToggleOptions<Truth, False>
): [T, (...args: T[]) => void];

export function useToggle<Truth, False, T extends Truth | False = Truth | False>(
    initialValue: T,
    options: UseToggleOptions<Truth, False> = {}
): [T, (...args: T[]) => void] {
    const { truthValue = true, falseValue = false } = options;
    const [state, setState] = useState<T>(initialValue);
    const toggle = useCallback(
        (...args: T[]) => {
            if (args.length) {
                setState(args[0]);
            } else {
                setState((state) => (state === truthValue ? falseValue : truthValue) as T);
            }
        },
        [truthValue, falseValue]
    );

    return [state, toggle];
}
