export default function guessSerializerType<
    T extends string | number | boolean | object | null | undefined
>(rawInit: T) {
    return rawInit == null
        ? 'any'
        : rawInit instanceof Set
        ? 'set'
        : rawInit instanceof Map
        ? 'map'
        : rawInit instanceof Date
        ? 'date'
        : typeof rawInit === 'string'
        ? 'string'
        : typeof rawInit === 'boolean'
        ? 'boolean'
        : typeof rawInit === 'object'
        ? 'object'
        : Array.isArray(rawInit)
        ? 'object'
        : !Number.isNaN(rawInit)
        ? 'number'
        : 'any';
}
