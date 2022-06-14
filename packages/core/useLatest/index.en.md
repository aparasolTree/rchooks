# useLatest

save recent data

## Implement

```tsx
export function useLatest<T extends any>(origin: T): { readonly current: T } {
    const ref = useRef<T>(origin);
    ref.current = origin;
    return ref;
}
```
