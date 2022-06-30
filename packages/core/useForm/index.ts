import React, { useCallback, useRef, useState } from 'react';
import { useMount } from '../useMount';
import rulesValidate from './rules';
import locale, { registerLocale } from './locale';
import type { Rules } from './types';

export interface UseFormOptions<V extends Record<string, any>> {
    field?: Record<keyof V, Partial<Record<Rules, boolean | number>>>;
    initialValue?: V;
    locale?: 'en' | 'zh_cn' | string;
}

const canISubmit = (error: Record<string, string>): boolean => {
    return Object.values(error).every((e) => !Boolean(e));
};

let elementsRef: Record<string, HTMLElement> = {};

export function useForm<V extends Record<string, any> = Record<string, any>>(
    options: UseFormOptions<V> = {}
) {
    const optionsRef = useRef(options);
    const ref = useRef<HTMLFormElement>(null);
    const fields = useRef<Record<string, string>>({});

    const [_errorMessage, setErrorMessage] = useState<Record<string, string>>({});
    const errorMessage = useRef(_errorMessage);
    const setFieldError = useCallback((field: string, errorInfo: string) => {
        setErrorMessage((prevError) => {
            const err = { ...prevError, [field]: errorInfo };
            errorMessage.current = err;
            return err;
        });
    }, []);

    const validate = useCallback(
        (name: string, value: string) => {
            const { locale: l = 'en' } = optionsRef.current;
            return new Promise<void>((resolve) => {
                Object.entries(optionsRef.current.field?.[name] || {}).forEach(([rule, val]) => {
                    const result = rulesValidate[rule] && rulesValidate[rule](value, val);
                    if (!result) {
                        setFieldError(
                            name,
                            locale[l][rule].replace(/\{(.*?)\}/g, (_, key: string) => {
                                return {
                                    field: name,
                                    [rule]: val,
                                }[key];
                            })
                        );
                        resolve();
                    } else {
                        setFieldError(name, '');
                        resolve();
                    }
                });
            });
        },
        [setFieldError]
    );

    const resetForm = useCallback(() => ref.current?.reset(), []);
    const handleSubmit = useCallback(
        (onSubmit: (value: Record<string, string>) => void) => {
            return (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const { elements } = event.target as HTMLFormElement;
                Object.keys(optionsRef.current.field || {}).forEach(async (f) => {
                    const element = elements[f] as HTMLInputElement;
                    if (element) {
                        const value = element.value;
                        fields.current[f] = value;
                        await validate(element.name, value);
                    }
                });

                Object.keys(errorMessage.current).length &&
                    canISubmit(errorMessage.current) &&
                    onSubmit(fields.current);
            };
        },
        [validate]
    );

    const handleChange = async (event: Event) => {
        const { value, name } = event.target as HTMLInputElement;
        await validate(name, value);
    };

    const handleBlur = (event: Event) => {
        handleChange(event);
    };

    useMount(() => {
        if (!ref.current) return;
        const { elements } = ref.current;
        Object.keys(optionsRef.current.field || {}).forEach((f) => {
            const element = elements[f] as HTMLInputElement;
            if (element) {
                elementsRef[f] = element;
                element.value = optionsRef.current.initialValue?.[f] || '';

                element.addEventListener('change', handleChange);
                element.addEventListener('blur', handleBlur);
            }
        });

        return () => {
            const elementKeys = Object.keys(elementsRef);
            if (elementKeys.length) {
                elementKeys.forEach((e) => {
                    elementsRef[e].removeEventListener('change', handleChange);
                    elementsRef[e].removeEventListener('blur', handleBlur);
                });
                elementsRef = {};
            }
        };
    });

    return {
        ref,
        errorMessage: _errorMessage,
        setFieldError,
        resetForm,
        handleSubmit,
    };
}

useForm['registerLocale'] = registerLocale;
