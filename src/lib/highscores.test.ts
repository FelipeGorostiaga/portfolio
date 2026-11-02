import { describe, expect, it } from 'vitest';
import { isBetter, readHighscore, recordHighscore } from '~/lib/highscores';

const memoryStorage = () => {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
};

const blockedStorage = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('SecurityError');
  },
};

describe('isBetter', () => {
  it('keeps the highest snake score and the fastest minesweeper time', () => {
    expect(isBetter('snake', 12, 10)).toBe(true);
    expect(isBetter('snake', 9, 10)).toBe(false);
    expect(isBetter('minesweeper', 40_000, 52_000)).toBe(true);
    expect(isBetter('minesweeper', 60_000, 52_000)).toBe(false);
    expect(isBetter('minesweeper', 60_000, null)).toBe(true);
  });
});

describe('recordHighscore', () => {
  it('has no highscore until a game is recorded', () => {
    expect(readHighscore('snake', memoryStorage())).toBeNull();
    expect(readHighscore('minesweeper', memoryStorage())).toBeNull();
  });

  it('saves a better result and keeps the best one', () => {
    const storage = memoryStorage();
    expect(recordHighscore('snake', 7, storage)).toBe(7);
    expect(recordHighscore('snake', 4, storage)).toBe(7);
    expect(recordHighscore('snake', 11, storage)).toBe(11);
    expect(readHighscore('snake', storage)).toBe(11);

    expect(recordHighscore('minesweeper', 52_000, storage)).toBe(52_000);
    expect(recordHighscore('minesweeper', 61_000, storage)).toBe(52_000);
    expect(readHighscore('minesweeper', storage)).toBe(52_000);
    expect(readHighscore('snake', storage)).toBe(11); // separate keys
  });

  it('does not count a snake game that scored nothing', () => {
    const storage = memoryStorage();
    expect(recordHighscore('snake', 0, storage)).toBeNull();
    expect(readHighscore('snake', storage)).toBeNull();
  });

  it('ignores corrupt stored values', () => {
    const storage = memoryStorage();
    storage.setItem('highscore:snake', 'banana');
    expect(readHighscore('snake', storage)).toBeNull();
    expect(recordHighscore('snake', 3, storage)).toBe(3);
  });

  it('never throws when storage is blocked', () => {
    expect(readHighscore('snake', blockedStorage)).toBeNull();
    expect(recordHighscore('snake', 5, blockedStorage)).toBe(5);
    expect(readHighscore('minesweeper', undefined)).toBeNull();
  });
});
