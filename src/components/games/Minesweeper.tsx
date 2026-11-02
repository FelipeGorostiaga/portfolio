import { useEffect, useState, type MouseEvent } from 'react';
import { useHighscore } from '~/hooks/useHighscore';
import {
  countFlags,
  flagAt,
  formatElapsed,
  MS_MINES,
  newGame,
  revealAt,
  type Cell,
  type MsGame,
} from '~/lib/games/minesweeper';
import styles from './Minesweeper.module.css';

function cellClass(cell: Cell): string {
  if (cell.revealed && cell.mine) return `ms r ${styles.mine}`;
  if (cell.revealed) return `ms r n${Math.min(cell.adjacent, 3)}`;
  return cell.flagged ? 'ms f' : `ms c ${styles.covered}`;
}

function cellLabel(cell: Cell, r: number, c: number): string {
  const where = `Row ${r + 1}, column ${c + 1}`;
  if (!cell.revealed) return `${where}, ${cell.flagged ? 'flagged' : 'covered'}`;
  if (cell.mine) return `${where}, mine`;
  return `${where}, ${cell.adjacent} neighbouring ${cell.adjacent === 1 ? 'mine' : 'mines'}`;
}

export default function Minesweeper() {
  const [game, setGame] = useState<MsGame>(() => newGame());
  const [now, setNow] = useState(() => Date.now());
  const over = game.status === 'won' || game.status === 'lost';

  // Re-render the clock while a game is running; the time itself comes from timestamps.
  useEffect(() => {
    if (game.status !== 'playing') return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [game.status]);

  const elapsed = game.startedAt === null ? 0 : (game.endedAt ?? now) - game.startedAt;

  // Only wins count; the highscore is the fastest winning time.
  const { best, record } = useHighscore('minesweeper');
  useEffect(() => {
    if (game.status === 'won' && game.startedAt !== null && game.endedAt !== null) {
      record(game.endedAt - game.startedAt);
    }
  }, [game.status, game.startedAt, game.endedAt, record]);

  // One stamp for both the game and the clock: a stale `now` before the start time shows a negative timer.
  const onReveal = (r: number, c: number) => {
    const at = Date.now();
    setGame((current) => revealAt(current, r, c, at));
    setNow(at);
  };

  const onFlag = (event: MouseEvent, r: number, c: number) => {
    event.preventDefault(); // no browser context menu on the board
    setGame((current) => flagAt(current, r, c));
  };

  const restart = () => {
    setGame(newGame());
    setNow(Date.now());
  };

  return (
    <div className={styles.game}>
      <div className={styles.hud}>
        <div className="stat">
          <span className="lbl">Flags left</span>
          <b>{MS_MINES - countFlags(game.board)}</b>
        </div>
        <button type="button" className={`btn btn-sm btn-ghost ${styles.newGame}`} onClick={restart}>
          New game
        </button>
        <div className="stat">
          <span className="lbl">Time</span>
          <b>{formatElapsed(elapsed)}</b>
        </div>
      </div>
      {best !== null && (
        <p className={`mono ${styles.best}`}>
          Your highscore: <b>{formatElapsed(best)}</b>
        </p>
      )}

      <div className={styles.boardWrap}>
        <div className={styles.board} role="group" aria-label="Minesweeper board">
          {game.board.map((row, r) =>
            row.map((cell, c) => (
              // aria-disabled (not disabled) so right-clicks on dead cells are still swallowed;
              // the engine already ignores moves on revealed cells and after the game ends.
              <button
                key={`${r}-${c}`}
                type="button"
                className={`${cellClass(cell)} ${styles.cell}`}
                aria-label={cellLabel(cell, r, c)}
                aria-disabled={over || cell.revealed}
                onClick={() => onReveal(r, c)}
                onContextMenu={(event) => onFlag(event, r, c)}
              >
                {cell.revealed && !cell.mine && cell.adjacent > 0 ? cell.adjacent : ''}
              </button>
            )),
          )}
        </div>

        {over && (
          <div className={styles.result}>
            <div className={`spot still ${styles.resultCard}`} role="status">
              <h2 className={styles.resultTitle}>{game.status === 'won' ? 'Board cleared!' : 'Game over'}</h2>
              <p className={styles.resultText}>
                {game.status === 'won' ? `Cleared in ${formatElapsed(elapsed)}` : 'You hit a mine.'}
              </p>
              <button type="button" className="btn btn-sm btn-primary" onClick={restart}>
                Play again
              </button>
            </div>
          </div>
        )}
      </div>

      <span className={`mono ${styles.help}`}>Click to reveal · right-click to flag · the first click is always safe</span>
    </div>
  );
}
