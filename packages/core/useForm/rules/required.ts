import { isEmptyArray, isNullOrUndefined } from '@rchooks/shared';

export const requiredValidate = (value: unknown) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) {
        return false;
    }

    return !!String(value).trim().length;
};
