import { isBrowser } from './is';

export const defaultWindow = isBrowser ? window : undefined;
export const defaultNavigator = isBrowser ? navigator : undefined;
export const defaultDocument = isBrowser ? document : undefined;
