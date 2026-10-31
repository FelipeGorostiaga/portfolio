export const MS_ROWS = 16;
export const MS_COLS = 16;
export const MS_MINES = 50;

export type Cell = { mine: boolean; flagged: boolean; revealed: boolean; adjacent: number };
export type Board = Cell[][];

const NEIGHBOURS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

const inside = (board: Board, r: number, c: number) =>
  r >= 0 && c >= 0 && r < board.length && c < board[0].length;

export function createEmptyBoard(rows: number, cols: number): Board {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ mine: false, flagged: false, revealed: false, adjacent: 0 })),
  );
}

export function boardFromMines(rows: number, cols: number, mines: Array<[number, number]>): Board {
  const board = createEmptyBoard(rows, cols);
  for (const [r, c] of mines) board[r][c].mine = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      board[r][c].adjacent = NEIGHBOURS.filter(
        ([dr, dc]) => inside(board, r + dr, c + dc) && board[r + dr][c + dc].mine,
      ).length;
    }
  }
  return board;
}

/** Mines go anywhere except the first-clicked cell and its neighbours. */
export function placeMines(
  rows: number,
  cols: number,
  count: number,
  safe: [number, number],
  random = Math.random,
): Board {
  const [safeRow, safeCol] = safe;
  const candidates: Array<[number, number]> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.abs(r - safeRow) > 1 || Math.abs(c - safeCol) > 1) candidates.push([r, c]);
    }
  }
  // Partial Fisher–Yates: the first `count` candidates become mines.
  const total = Math.min(count, candidates.length);
  for (let i = 0; i < total; i++) {
    const j = i + Math.floor(random() * (candidates.length - i));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return boardFromMines(rows, cols, candidates.slice(0, total));
}

const copyBoard = (board: Board): Board => board.map((row) => row.map((cell) => ({ ...cell })));

export function reveal(board: Board, r: number, c: number): { board: Board; hitMine: boolean } {
  const target = board[r]?.[c];
  if (!target || target.revealed || target.flagged) return { board, hitMine: false };
  const next = copyBoard(board);
  if (target.mine) {
    next[r][c].revealed = true;
    return { board: next, hitMine: true };
  }
  const queue: Array<[number, number]> = [[r, c]];
  while (queue.length > 0) {
    const [row, col] = queue.pop()!;
    const cell = next[row][col];
    if (cell.revealed || cell.flagged || cell.mine) continue;
    cell.revealed = true;
    if (cell.adjacent !== 0) continue;
    for (const [dr, dc] of NEIGHBOURS) {
      if (inside(next, row + dr, col + dc)) queue.push([row + dr, col + dc]);
    }
  }
  return { board: next, hitMine: false };
}

export function toggleFlag(board: Board, r: number, c: number): Board {
  if (board[r][c].revealed) return board;
  const next = board.map((row) => [...row]);
  next[r][c] = { ...board[r][c], flagged: !board[r][c].flagged };
  return next;
}

export function revealMines(board: Board): Board {
  return board.map((row) => row.map((cell) => (cell.mine ? { ...cell, revealed: true } : cell)));
}

export function hasWon(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell.mine || cell.revealed));
}

export function countFlags(board: Board): number {
  return board.reduce((sum, row) => sum + row.filter((cell) => cell.flagged).length, 0);
}

const pad = (value: number) => String(value).padStart(2, '0');

export function formatElapsed(ms: number): string {
  const centis = Math.floor(ms / 10);
  return `${pad(Math.floor(centis / 6000))}:${pad(Math.floor(centis / 100) % 60)}.${pad(centis % 100)}`;
}
