export function toBoolean(value?: number | string | undefined): boolean {
    if (typeof value === 'string') {
        const lowerCaseValue = value.toLowerCase();
        return lowerCaseValue === 'yes' || lowerCaseValue === 'true';
    }

    if (typeof value === 'number') {
        return value > 0;
    }

    return Boolean(value);
}
