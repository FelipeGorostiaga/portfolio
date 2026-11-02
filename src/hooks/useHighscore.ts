import { useCallback, useEffect, useState } from 'react';
import { isBetter, readHighscore, recordHighscore, type HighscoreGame } from '~/lib/highscores';

// Even reading window.localStorage throws when storage is blocked.
function storage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

/**
 * The player's best for a game, kept in localStorage. It is read after mount, so the
 * pre-rendered page (which can't know it) and the first client render always match.
 */
export function useHighscore(game: HighscoreGame) {
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    setBest(readHighscore(game, storage()));
  }, [game]);

  const record = useCallback(
    (value: number) => {
      recordHighscore(game, value, storage());
      // Compare with what's on screen too, in case storage is blocked.
      setBest((current) => (value > 0 && isBetter(game, value, current) ? value : current));
    },
    [game],
  );

  return { best, record };
}
