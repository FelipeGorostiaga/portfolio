import styles from './Games.module.css';

// Static board snapshots from docs/design/Games.dc.html.

// '#' covered, 'F' flagged, digit = revealed with that many neighbouring mines.
const MINE_ROWS = ['##1001###', '#F1002F##', '111001221', '000000000', '001110000', '112F10111', '#F21101F#', '##100012#', '##100001#'];

export function MinesweeperPreview() {
  const cells = MINE_ROWS.flatMap((row) => row.split(''));
  return (
    <div className={`${styles.preview} ${styles.minesPreview}`} aria-hidden="true">
      {cells.map((cell, i) => {
        if (cell === '#') return <span key={i} className="ms c" />;
        if (cell === 'F') return <span key={i} className="ms f" />;
        return (
          <span key={i} className={`ms r n${cell}`}>
            {cell === '0' ? '' : cell}
          </span>
        );
      })}
    </div>
  );
}

const SNAKE_COLS = 14;
const SNAKE_ROWS = 10;
// Tail first, head last.
const SNAKE_BODY = [[1, 8], [2, 8], [3, 8], [4, 8], [4, 7], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [8, 5], [8, 4], [8, 3], [9, 3], [10, 3]];
const APPLE = [11, 6];

export function SnakePreview() {
  const cells: Array<{ className: string; opacity: number }> = Array.from({ length: SNAKE_COLS * SNAKE_ROWS }, () => ({
    className: styles.sn,
    opacity: 1,
  }));
  SNAKE_BODY.forEach(([x, y], i) => {
    const head = i === SNAKE_BODY.length - 1;
    cells[y * SNAKE_COLS + x] = {
      className: `${styles.sn} ${head ? styles.head : styles.body}`,
      opacity: head ? 1 : 0.35 + 0.65 * (i / (SNAKE_BODY.length - 1)),
    };
  });
  cells[APPLE[1] * SNAKE_COLS + APPLE[0]] = { className: `${styles.sn} ${styles.apple}`, opacity: 1 };

  return (
    <div className={`${styles.preview} ${styles.snakePreview}`} aria-hidden="true">
      {cells.map((cell, i) => (
        <span key={i} className={cell.className} style={cell.opacity < 1 ? { opacity: cell.opacity } : undefined} />
      ))}
    </div>
  );
}
