export function initBoard(): string[][] {
    return Array.from({ length: 3 }, () => Array(3).fill(''));
}
