export interface Seriaizer<T> {
    read: (raw: string) => T;
    write: (value: T) => string;
}

type SerializerMapKey = 'string' | 'number' | 'boolean' | 'object' | 'any' | 'map' | 'set' | 'date';
export const StroageSerializers: Record<SerializerMapKey, Seriaizer<any>> = {
    string: { read: (val: string) => val, write: (val: any) => String(val) },
    number: { read: (val: string) => Number.parseFloat(val), write: (val: any) => String(val) },
    boolean: { read: (val: string) => val === 'true', write: (val: any) => String(val) },
    object: { read: (val: string) => JSON.parse(val), write: (val: any) => JSON.stringify(val) },
    any: { read: (val: string) => val, write: (val: any) => String(val) },
    map: {
        read: (val: string) => new Map(JSON.parse(val)),
        write: (val: any) => JSON.stringify(Array.from((val as Map<any, any>).entries())),
    },
    set: {
        read: (val: string) => new Set(JSON.parse(val)),
        write: (val: any) => JSON.stringify(Array.from((val as Set<any>).values())),
    },
    date: {
        read: (val: string) => new Date(val),
        write: (val: any) => (val as Date).toISOString(),
    },
};
