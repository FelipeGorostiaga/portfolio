import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { useTheme } from '~/hooks/useTheme';
import {
  clearLife,
  createLife,
  seedGliderGun,
  setCell,
  shuffleLife,
  stepLife,
  type LifeState,
} from '~/lib/games/life';
import { accentLut, PALETTES } from '~/lib/palette';
import { type Theme } from '~/lib/theme';
import styles from './Games.module.css';

const TICK_MS = 110;

type Stats = { generation: number; population: number };

function draw(ctx: CanvasRenderingContext2D, s: LifeState, w: number, h: number, theme: Theme, hover: number) {
  const lut = accentLut(theme);
  const hud = PALETTES[theme].hud;
  const { cols: C, rows: R, cells, age, heat } = s;
  const cw = w / C;
  const ch = h / R;
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = `rgba(${hud},0.06)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i < C; i++) {
    const gx = Math.round(i * cw) + 0.5;
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, h);
  }
  for (let j = 1; j < R; j++) {
    const gy = Math.round(j * ch) + 0.5;
    ctx.moveTo(0, gy);
    ctx.lineTo(w, gy);
  }
  ctx.stroke();

  // Fading trail where cells recently died.
  for (let k = 0; k < cells.length; k++) {
    const hv = heat[k];
    if (cells[k] || hv < 0.04) continue;
    ctx.fillStyle = `rgba(${lut[8]},${(hv * 0.32).toFixed(3)})`;
    ctx.fillRect((k % C) * cw + 1, ((k / C) | 0) * ch + 1, cw - 2, ch - 2);
  }

  // Living cells with a soft glow; color shifts with age.
  for (let m = 0; m < cells.length; m++) {
    if (!cells[m]) continue;
    const px = (m % C) * cw;
    const py = ((m / C) | 0) * ch;
    const color = lut[Math.max(0, 31 - age[m] * 3)];
    ctx.fillStyle = `rgba(${color},0.16)`;
    ctx.fillRect(px - cw * 0.4, py - ch * 0.4, cw * 1.8, ch * 1.8);
    ctx.fillStyle = `rgba(${color},0.95)`;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(px + 1.5, py + 1.5, cw - 3, ch - 3, 2.5);
    else ctx.rect(px + 1.5, py + 1.5, cw - 3, ch - 3);
    ctx.fill();
  }

  if (hover >= 0) {
    ctx.strokeStyle = `rgba(${lut[20]},0.9)`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect((hover % C) * cw + 1, ((hover / C) | 0) * ch + 1, cw - 2, ch - 2);
  }
}

/** Playable Game of Life — port of the board in docs/design/Games.dc.html. */
export default function LifePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lifeRef = useRef<LifeState | null>(null);
  const runningRef = useRef(true);
  const hoverRef = useRef(-1);
  // The board is only redrawn when something on it changed (a step, a paint, hover, resize, theme).
  const dirtyRef = useRef(true);
  const paintRef = useRef<{ active: boolean; value: boolean }>({ active: false, value: true });
  const { theme } = useTheme();
  const themeRef = useRef<Theme>(theme);
  const [running, setRunning] = useState(true);
  const [stats, setStats] = useState<Stats>({ generation: 0, population: 0 });

  themeRef.current = theme;

  // Marks the board for a redraw and re-renders the stats only when they differ.
  const sync = useCallback(() => {
    const s = lifeRef.current;
    if (!s) return;
    dirtyRef.current = true;
    setStats((prev) =>
      prev.generation === s.generation && prev.population === s.population
        ? prev
        : { generation: s.generation, population: s.population },
    );
  }, []);

  const run = (value: boolean) => {
    runningRef.current = value;
    setRunning(value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const life = createLife();
    seedGliderGun(life);
    lifeRef.current = life;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      runningRef.current = false;
      setRunning(false);
    }
    sync();

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let onScreen = true;

    const resize = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = cw;
      h = ch;
      dirtyRef.current = true;
    };

    let drawnTheme: Theme | null = null;
    const loop = (now: number) => {
      if (!onScreen) {
        raf = 0;
        return;
      }
      if (!document.hidden && w) {
        if (runningRef.current && now - last >= TICK_MS) {
          last = now;
          stepLife(life);
          sync();
        }
        if (dirtyRef.current || drawnTheme !== themeRef.current) {
          draw(ctx, life, w, h, themeRef.current, hoverRef.current);
          dirtyRef.current = false;
          drawnTheme = themeRef.current;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !raf) raf = requestAnimationFrame(loop);
    });
    visibility.observe(canvas);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      sizeObserver.disconnect();
      visibility.disconnect();
    };
  }, [sync]);

  const cellAt = (event: PointerEvent<HTMLCanvasElement>) => {
    const s = lifeRef.current;
    const box = event.currentTarget.getBoundingClientRect();
    if (!s || !box.width || !box.height) return -1;
    const x = Math.floor(((event.clientX - box.left) / box.width) * s.cols);
    const y = Math.floor(((event.clientY - box.top) / box.height) * s.rows);
    if (x < 0 || y < 0 || x >= s.cols || y >= s.rows) return -1;
    return y * s.cols + x;
  };

  const paint = (k: number) => {
    const s = lifeRef.current;
    if (!s || k < 0) return;
    if (setCell(s, k, paintRef.current.value)) sync();
  };

  const setHover = (k: number) => {
    if (hoverRef.current === k) return;
    hoverRef.current = k;
    dirtyRef.current = true;
  };

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const s = lifeRef.current;
    const k = cellAt(event);
    // Primary button only (mouse left, touch, pen): right/middle clicks keep their usual meaning.
    if (!s || k < 0 || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    // Drawing toggles based on the first cell: start on a live cell to erase.
    paintRef.current = { active: true, value: !s.cells[k] };
    paint(k);
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const k = cellAt(event);
    setHover(k);
    if (paintRef.current.active) paint(k);
  };

  const stopPainting = () => {
    paintRef.current.active = false;
  };

  const act = (update: (s: LifeState) => void, nextRunning?: boolean) => {
    const s = lifeRef.current;
    if (!s) return;
    update(s);
    if (nextRunning !== undefined) run(nextRunning);
    sync();
  };

  return (
    <section className={`spot still enter ${styles.panel}`} aria-labelledby="life-title">
      <div className={styles.boardColumn}>
        <div className={styles.boardWrap}>
          <canvas
            ref={canvasRef}
            className={styles.life}
            role="img"
            aria-label="Game of Life board. Click or drag to draw cells."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stopPainting}
            onPointerCancel={stopPainting}
            onPointerLeave={() => {
              stopPainting();
              setHover(-1);
            }}
          />
        </div>
        <span className={`mono ${styles.hint}`}>Click or drag on the board to draw · it wraps around the edges</span>
      </div>

      <div className={styles.side}>
        <span className={`${styles.live} ${running ? '' : styles.paused}`}>
          <i aria-hidden="true" />
          {running ? 'Live simulation' : 'Paused'}
        </span>
        <h2 id="life-title" className={styles.title}>
          Game of Life
        </h2>
        <p className={styles.copy}>
          A cellular automaton devised by John Horton Conway in 1970. It&apos;s Turing complete: set an initial
          pattern and watch it evolve. This board starts with a Gosper glider gun.
        </p>
        <ol className={styles.rules}>
          <li>Fewer than two neighbours: the cell dies.</li>
          <li>Two or three neighbours: it lives on.</li>
          <li>More than three neighbours: it dies.</li>
          <li>Exactly three around an empty cell: a cell is born.</li>
        </ol>
        <div className={styles.stats}>
          <div className="stat">
            <span className="lbl">Generation</span>
            <b>{stats.generation.toLocaleString('en-US')}</b>
          </div>
          <div className="stat">
            <span className="lbl">Population</span>
            <b>{stats.population.toLocaleString('en-US')}</b>
          </div>
        </div>
        <div className={styles.buttons}>
          <button type="button" className="btn btn-sm btn-primary" onClick={() => run(!running)}>
            {running ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" />
              </svg>
            )}
            {running ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => act(stepLife, false)}>
            Step
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => act((s) => shuffleLife(s))}>
            Shuffle
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => act(seedGliderGun, true)}>
            Glider gun
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => act(clearLife, false)}>
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
