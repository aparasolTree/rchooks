import { useCallback, useState } from 'react';

export interface UseToggleOptions<Truth, False> {
    truthValue?: Truth;
    falseValue?: False;
}

export function useToggle<Truth = true, False = false, T extends Truth | False = Truth | False>(
    initialValue: T,
    options?: UseToggleOptions<Truth, False>
): [T, (value?: T) => void];

export function useToggle<Truth, False, T extends Truth | False = Truth | False>(
    initialValue?: T,
    options?: UseToggleOptions<Truth, False>
): [T, (value?: T) => void];

export function useToggle(
    initialValue: boolean = false,
    options: UseToggleOptions<true, false> = {}
) {
    const { truthValue = true, falseValue = false } = options;
    const [state, setState] = useState(initialValue);
    const toggle = useCallback(
        function (value?: boolean) {
            if (arguments.length) {
                if (truthValue === value || falseValue === value) {
                    setState(value);
                } else {
                    console.error(
                        `[useToggle]: The value passed in must be ${JSON.stringify(
                            truthValue
                        )} or ${JSON.stringify(falseValue)}`
                    );
                }
            } else {
                setState((state) => (state === truthValue ? falseValue : truthValue));
            }
        },
        [truthValue, falseValue]
    );

    return [state, toggle] as const;
}
