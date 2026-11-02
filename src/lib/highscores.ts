export type HighscoreGame = 'snake' | 'minesweeper';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

const KEYS: Record<HighscoreGame, string> = {
  snake: 'highscore:snake',
  minesweeper: 'highscore:minesweeper',
};

/** Snake keeps the highest score; Minesweeper the fastest winning time (ms). */
export function isBetter(game: HighscoreGame, candidate: number, best: number | null): boolean {
  if (best === null) return true;
  return game === 'snake' ? candidate > best : candidate < best;
}

/** The saved best, or null when there is none (or storage is blocked or holds junk). */
export function readHighscore(game: HighscoreGame, storage: StorageLike | undefined): number | null {
  try {
    const value = Number(storage?.getItem(KEYS[game]) ?? NaN);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

/**
 * Saves `value` when it beats the stored best and returns the best afterwards. A Snake game
 * that scored nothing doesn't count. Blocked storage still returns the value for this visit.
 */
export function recordHighscore(game: HighscoreGame, value: number, storage: StorageLike | undefined): number | null {
  const best = readHighscore(game, storage);
  if (!(value > 0) || !isBetter(game, value, best)) return best;
  try {
    storage?.setItem(KEYS[game], String(value));
  } catch {
    // Private mode or blocked storage: the highscore still shows until the page closes.
  }
  return value;
}
