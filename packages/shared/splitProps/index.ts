export type SplitProps<T, K extends (keyof T)[][]> = [
    ...{
        [P in keyof K]: P extends `${number}` ? Pick<T, Extract<K[P], (keyof T)[]>[number]> : never;
    },
    Omit<T, K[number][number]>
];

export function splitProps<T, K extends [(keyof T)[], ...(keyof T)[][]]>(
    props: T,
    ...keys: K
): SplitProps<T, K> {
    const blocked = new Set<keyof T>(keys.flat());
    const descriptors = Object.getOwnPropertyDescriptors(props);
    const result = keys.map((key) => {
        const clone = {};
        for (let i = 0; i < key.length; i++) {
            const k = key[i];
            Object.defineProperty(
                clone,
                k,
                descriptors[k]
                    ? descriptors[k]
                    : {
                          get() {
                              return props[k];
                          },
                          set() {
                              return true;
                          },
                      }
            );
        }

        return clone;
    });

    result.push(
        new Proxy(blocked, {
            get(blocked, prop: string | number | symbol) {
                return blocked.has(prop as keyof T) ? undefined : props[prop];
            },
            has(blocked, prop: string | number | symbol) {
                return blocked.has(prop as keyof T) ? false : prop in props;
            },
            ownKeys() {
                return Object.keys(props).filter((key) => !blocked.has(key as keyof T));
            },
        })
    );

    return result as SplitProps<T, K>;
}
