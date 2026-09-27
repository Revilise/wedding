export function generateId(options: { size?: number; prefix?: string } = {}) {
    const { size = 8, prefix = '' } = options;

    if (!Number.isSafeInteger(size) || size < 0) {
        throw new RangeError('size must be a non-negative safe integer');
    }

    const bytes = crypto.getRandomValues(new Uint8Array(Math.ceil(size / 2)));
    const id = Array.from(bytes, byte => byte.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, size);

    return prefix + id;
}
