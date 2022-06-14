# useLatest

保存最近的数据

## 实现

```tsx
export function useLatest<T extends any>(origin: T): { readonly current: T } {
    const ref = useRef<T>(origin);
    ref.current = origin;
    return ref;
}
```
