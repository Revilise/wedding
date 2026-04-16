export function filterObject<T extends object>(
    object: T,
    expression: ({ key, value }: { key: string, value: any }) => boolean
): Partial<T> {
    return Object.fromEntries(
        Object.entries(object).filter(([key, value]) => expression({ key, value }))
    ) as Partial<T>;
}
