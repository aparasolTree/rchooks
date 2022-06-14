export enum Device {
    Browser = 'Browser',
    Server = 'Server',
    Native = 'Nactive',
}

const { Browser, Server, Native } = Device;
const canIUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
const canIUseNative = !!(typeof navigator !== 'undefined' && navigator.product === 'ReactNative');
const device = canIUseNative ? Native : canIUseDOM ? Browser : Server;

export interface UseSSRReturn {
    isBrowser: boolean;
    isServer: boolean;
    isNative: boolean;
    device: Device;
    canIUseWorker: boolean;
    canIUseEventListener: boolean;
    canIUseViewport: boolean;
}

const SSRObject: UseSSRReturn = {
    isBrowser: device === Browser,
    isServer: device === Server,
    isNative: device === Native,
    device,
    canIUseWorker: typeof Worker !== 'undefined',
    canIUseViewport: device === Browser && !!window.screen,
    canIUseEventListener: device === Browser && !!window.addEventListener,
};

export const weAreServer = () => (SSRObject.isServer = true);

export function useSSR() {
    return SSRObject;
}
