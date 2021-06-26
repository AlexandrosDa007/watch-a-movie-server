/**
 * Creates a simple unique id
 * @param prefix An optional prefix
 */
export function generateId(prefix = ''): string {
    return prefix + Math.random().toString(36).substr(2, 9);
}