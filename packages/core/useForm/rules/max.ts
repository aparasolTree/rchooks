import { isEmpty } from '@rchooks/shared';

export const maxLengthValidate = (value: unknown, max: number) => {
    if (isEmpty(value)) return true;
    return String(value).length <= max;
};
