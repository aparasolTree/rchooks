export enum Device {
    Browser = 'Browser',
    Server = 'Server',
    Native = 'Nactive',
}

const { Browser, Server, Native } = Device;
const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
const canUseNative = !!(typeof navigator !== 'undefined' && navigator.product === 'ReactNative');
const device = canUseNative ? Native : canUseDOM ? Browser : Server;

export interface UseSSRReturn {
    isBrowser: boolean;
    isServer: boolean;
    isNative: boolean;
    device: Device;
    canUseWorker: boolean;
    canUseEventListener: boolean;
    canUseViewport: boolean;
}

const SSRObject: UseSSRReturn = {
    isBrowser: device === Browser,
    isServer: device === Server,
    isNative: device === Native,
    device,
    canUseWorker: typeof Worker !== 'undefined',
    canUseViewport: device === Browser && !!window.screen,
    canUseEventListener: device === Browser && !!window.addEventListener,
};

export const weAreServer = () => (SSRObject.isServer = true);

export default function useSSR() {
    return SSRObject;
}
