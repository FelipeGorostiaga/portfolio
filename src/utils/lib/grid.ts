export function createEmptyGrid<T>(rows: number, cols: number, mappingFn: () => T): T[][] {
    return Array.from({length: rows}, () => Array.from({length: cols}, mappingFn));
}

