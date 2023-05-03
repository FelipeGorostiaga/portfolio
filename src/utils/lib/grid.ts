export function createGrid<T>(rows: number, cols: number, mappingFn: () => T): T[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, mappingFn));
}

export const neighbourOperations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function getRoundedProperty(i: number, j: number, rows: number, cols: number): string {
  if (i === 0 && j === 0) {
    return 'rounded-ss';
  }
  if (i === (rows - 1) && j === (cols - 1)) {
    return 'rounded-ee';
  }
  if (i === (rows - 1) && j === 0) {
    return 'rounded-es';
  }
  if (i === 0 && j === (cols - 1)) {
    return 'rounded-se';
  }
  return '';
}
