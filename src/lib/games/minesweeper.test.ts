import { describe, expect, it } from 'vitest';
import {
  boardFromMines,
  countFlags,
  flagAt,
  formatElapsed,
  hasWon,
  newGame,
  placeMines,
  reveal,
  revealAt,
  revealMines,
  toggleFlag,
  type Board,
  type MsGame,
} from '~/lib/games/minesweeper';

const seeded = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 2 ** 32;
  return seed / 2 ** 32;
};

const revealedCount = (b: Board) => b.flat().filter((c) => c.revealed).length;

describe('placeMines', () => {
  it('places exactly the requested mines and never on or around the first click', () => {
    for (let seed = 0; seed < 200; seed++) {
      const b = placeMines(16, 16, 50, [8, 8], seeded(seed));
      expect(b.flat().filter((c) => c.mine)).toHaveLength(50);
      for (let r = 7; r <= 9; r++) {
        for (let c = 7; c <= 9; c++) expect(b[r][c].mine).toBe(false);
      }
    }
  });
});

describe('reveal', () => {
  it('counts adjacent mines', () => {
    const b = boardFromMines(3, 3, [[0, 0]]);
    expect(b[1][1].adjacent).toBe(1);
    expect(b[2][2].adjacent).toBe(0);
  });

  it('flood-fills empty areas and stops at numbers', () => {
    const { board, hitMine } = reveal(boardFromMines(4, 4, [[3, 3]]), 0, 0);
    expect(hitMine).toBe(false);
    expect(revealedCount(board)).toBe(15);
    expect(hasWon(board)).toBe(true);
  });

  it('opens only the clicked cell when it has a number', () => {
    expect(revealedCount(reveal(boardFromMines(3, 3, [[0, 0]]), 1, 1).board)).toBe(1);
  });

  it('reports a mine hit', () => {
    expect(reveal(boardFromMines(2, 2, [[0, 0]]), 0, 0).hitMine).toBe(true);
  });

  it('ignores flagged cells and does not mutate the input', () => {
    const flagged = toggleFlag(boardFromMines(2, 2, [[0, 0]]), 0, 0);
    const res = reveal(flagged, 0, 0);
    expect(res.hitMine).toBe(false);
    expect(res.board[0][0].revealed).toBe(false);
    expect(flagged[0][0].flagged).toBe(true);
  });
});

describe('toggleFlag', () => {
  it('does nothing on a revealed cell', () => {
    const opened = reveal(boardFromMines(3, 3, [[0, 0]]), 1, 1).board;
    expect(toggleFlag(opened, 1, 1)[1][1].flagged).toBe(false);
  });

  it('is counted by countFlags', () => {
    const b = toggleFlag(toggleFlag(boardFromMines(3, 3, [[0, 0]]), 0, 0), 2, 2);
    expect(countFlags(b)).toBe(2);
    expect(countFlags(toggleFlag(b, 2, 2))).toBe(1);
  });
});

describe('revealMines', () => {
  it('uncovers every mine and nothing else', () => {
    const b = revealMines(boardFromMines(3, 3, [[0, 0], [2, 2]]));
    expect(b[0][0].revealed && b[2][2].revealed).toBe(true);
    expect(revealedCount(b)).toBe(2);
  });
});

describe('game flow', () => {
  const playing = (board: Board): MsGame => ({ board, status: 'playing', startedAt: 0, endedAt: null });

  it('places mines on the first reveal, away from the click, and starts the clock', () => {
    const game = revealAt(newGame(), 8, 8, 1000, seeded(7));
    expect(game.status).toBe('playing');
    expect(game.startedAt).toBe(1000);
    expect(game.board[8][8].revealed).toBe(true);
    expect(game.board.flat().filter((c) => c.mine)).toHaveLength(50);
  });

  it('loses on a mine and uncovers every mine', () => {
    const game = revealAt(playing(boardFromMines(3, 3, [[0, 0], [2, 2]])), 0, 0, 500);
    expect(game.status).toBe('lost');
    expect(game.endedAt).toBe(500);
    expect(game.board[2][2].revealed).toBe(true);
  });

  it('wins when the last safe cell opens', () => {
    const game = revealAt(playing(boardFromMines(1, 2, [[0, 0]])), 0, 1, 900);
    expect(game.status).toBe('won');
    expect(game.endedAt).toBe(900);
  });

  it('ignores every move once the game is over', () => {
    const lost = revealAt(playing(boardFromMines(3, 3, [[0, 0]])), 0, 0, 500);
    expect(revealAt(lost, 2, 2, 600)).toBe(lost);
    expect(flagAt(lost, 2, 2)).toBe(lost);
  });

  it('only flags while playing', () => {
    const fresh = newGame();
    expect(flagAt(fresh, 0, 0)).toBe(fresh);
    expect(flagAt(playing(boardFromMines(2, 2, [[0, 0]])), 0, 0).board[0][0].flagged).toBe(true);
  });
});

describe('formatElapsed', () => {
  it('formats minutes, seconds and centiseconds', () => {
    expect(formatElapsed(65_430)).toBe('01:05.43');
  });
});
