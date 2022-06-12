export function objectPick<T extends object, K extends keyof T>(origin: T, keys: K[]) {
    return Object.fromEntries(
        Object.entries(origin).filter(([key]) => keys.includes(key as any))
    ) as { [Key in K]: T[Key] };
}
