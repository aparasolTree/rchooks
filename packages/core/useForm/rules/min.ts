import { isEmpty } from '@rchooks/shared';

export const minLengthValidate = (value: unknown, min: number) => {
    if (isEmpty(value)) return true;
    return String(value).length >= min;
};
