import { isEmpty } from '@rchooks/shared';

export const emailValidate = (value: unknown) => {
    if (isEmpty(value)) return true;

    const emailRE =
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRE.test(String(value));
};
