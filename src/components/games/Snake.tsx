import { useEffect, useRef, useState } from 'react';
import { useInterval } from '~/hooks/useInterval';
import { useTheme } from '~/hooks/useTheme';
import {
  createSnake,
  keyToDirection,
  SNAKE_COLS,
  SNAKE_ROWS,
  SNAKE_TICK_MS,
  stepSnake,
  turn,
  type SnakeState,
} from '~/lib/games/snake';
import { PALETTES } from '~/lib/palette';
import { type Theme } from '~/lib/theme';
import styles from './Snake.module.css';

const SIZE = 500;
const CELL = SIZE / SNAKE_COLS;
const APPLE = '#f43f5e';

const rgba = (rgb: number[], alpha: number) => `rgba(${rgb.join(',')},${alpha})`;

function draw(ctx: CanvasRenderingContext2D, game: SnakeState, theme: Theme) {
  const pal = PALETTES[theme];
  ctx.clearRect(0, 0, SIZE, SIZE);

  ctx.strokeStyle = `rgba(${pal.hud},0.06)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i < SNAKE_COLS; i++) {
    ctx.moveTo(i * CELL + 0.5, 0);
    ctx.lineTo(i * CELL + 0.5, SIZE);
  }
  for (let j = 1; j < SNAKE_ROWS; j++) {
    ctx.moveTo(0, j * CELL + 0.5);
    ctx.lineTo(SIZE, j * CELL + 0.5);
  }
  ctx.stroke();

  // Body fades toward the tail; the head glows.
  const last = game.snake.length - 1;
  game.snake.forEach((part, i) => {
    const x = part.x * CELL + 2;
    const y = part.y * CELL + 2;
    const size = CELL - 4;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, size, size, 5);
    else ctx.rect(x, y, size, size);
    if (i === 0) {
      ctx.shadowColor = rgba(pal.a3, 0.7);
      ctx.shadowBlur = 16;
      ctx.fillStyle = rgba(pal.a3, 1);
    } else {
      const alpha = last ? 1 - 0.65 * (i / last) : 1;
      const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
      gradient.addColorStop(0, rgba(pal.a1, alpha));
      gradient.addColorStop(1, rgba(pal.a2, alpha));
      ctx.shadowBlur = 0;
      ctx.fillStyle = gradient;
    }
    ctx.fill();
  });

  ctx.shadowColor = 'rgba(244,63,94,0.6)';
  ctx.shadowBlur = 14;
  ctx.fillStyle = APPLE;
  ctx.beginPath();
  ctx.arc((game.apple.x + 0.5) * CELL, (game.apple.y + 0.5) * CELL, CELL * 0.36, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [game, setGame] = useState<SnakeState>(createSnake);
  const [started, setStarted] = useState(false);
  const running = started && !game.over;

  useInterval(() => setGame((current) => stepSnake(current)), running ? SNAKE_TICK_MS : null);

  // Arrow keys steer; the first one starts the game.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const direction = keyToDirection(event);
      if (!direction) return;
      event.preventDefault(); // keep the page from scrolling
      setStarted(true);
      setGame((current) => turn(current, direction));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(ctx, game, theme);
  }, [game, theme]);

  const restart = () => {
    setGame(createSnake());
    setStarted(false);
  };

  return (
    <>
      <div className={styles.game}>
        <div className={styles.hud}>
          <div className="stat">
            <span className="lbl">Score</span>
            <b>{game.score}</b>
          </div>
          <div className="stat">
            <span className="lbl">Status</span>
            <b>{game.over ? 'Over' : running ? 'Playing' : 'Ready'}</b>
          </div>
        </div>
        <div className={styles.boardWrap}>
          <canvas
            ref={canvasRef}
            className={styles.board}
            role="img"
            aria-label={`Snake board. Score ${game.score}.`}
          />
          {game.over && (
            <div className={styles.result}>
              <div className={`spot still ${styles.resultCard}`} role="status">
                <h2 className={styles.resultTitle}>Game over</h2>
                <p className={styles.resultText}>
                  You ate {game.score} {game.score === 1 ? 'apple' : 'apples'}.
                </p>
                <button type="button" className="btn btn-sm btn-primary" onClick={restart}>
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
        <span className={`mono ${styles.help}`}>Press an arrow key to start · steer with the arrow keys</span>
      </div>
      <p className={styles.noKeyboard}>Snake needs a keyboard. Try it on a larger screen.</p>
    </>
  );
}
