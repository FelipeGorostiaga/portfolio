import { useEffect, useRef } from 'react';
import { useTheme } from '~/hooks/useTheme';
import { accentLut, PALETTES } from '~/lib/palette';
import { type Theme } from '~/lib/theme';

/*
 * Interactive dot lattice on springs — a port of `_build` / `_frame` / `_move` / `_down`
 * in docs/design/Main.dc.html. Values (forces, springs, ripples, sweep, HUD) are the design's.
 */

type HeroFieldProps = {
  /** Force multiplier (design default 1, range 0–2). */
  intensity?: number;
  /** Grid spacing in px (design default 30, range 18–48). */
  spacing?: number;
  className?: string;
};

type Ripple = { x: number; y: number; t: number };

const R = 140; // pointer influence radius
const K = 0.05; // spring
const D = 0.87; // damping
const IDLE_MS = 2600; // ghost pointer takes over after this
const RIPPLE_MS = 1700;
const MAX_RIPPLES = 5;
const TAU = 6.2832;

export default function HeroField({ intensity = 1, spacing = 30, className }: HeroFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef<Theme>(theme);
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    redrawRef.current?.(); // reduced motion has no loop, so repaint on theme change
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    const ptr = { x: -1, y: -1, tx: 0, ty: 0, last: -1e9, inside: false };
    const ripples: Ripple[] = [];
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let n = 0;
    let rx = new Float32Array(0);
    let ry = new Float32Array(0);
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let pr = new Float32Array(0);
    let raf = 0;

    const build = () => {
      const g = Math.max(14, spacing);
      cols = Math.ceil(w / g) + 1;
      rows = Math.ceil(h / g) + 1;
      n = cols * rows;
      const ox = (w - (cols - 1) * g) / 2;
      const oy = (h - (rows - 1) * g) / 2;
      rx = new Float32Array(n);
      ry = new Float32Array(n);
      x = new Float32Array(n);
      y = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      pr = new Float32Array(n);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i;
          rx[k] = x[k] = ox + i * g;
          ry[k] = y[k] = oy + j * g;
        }
      }
    };

    const frame = (now: number) => {
      if (!n) return;
      const lut = accentLut(themeRef.current);
      const pal = PALETTES[themeRef.current];
      const t = (now - t0) / 1000;

      // Follow the real pointer, or drift along a Lissajous path when idle.
      const live = ptr.inside && now - ptr.last < IDLE_MS;
      const tx = live ? ptr.tx : w * (0.56 + 0.3 * Math.sin(t * 0.37));
      const ty = live ? ptr.ty : h * (0.46 + 0.25 * Math.sin(t * 0.61 + 1.1));
      const ease = live ? 0.22 : 0.035;
      ptr.x += (tx - ptr.x) * ease;
      ptr.y += (ty - ptr.y) * ease;

      const inv2R2 = 1 / (2 * R * R);
      const reach2 = 9 * R * R;
      const S = 2.6 * intensity;
      const SW = 1.3 * intensity;
      for (let q = ripples.length - 1; q >= 0; q--) if (now - ripples[q].t > RIPPLE_MS) ripples.splice(q, 1);
      const sweep = ((t * 260) % (w + h * 0.6 + 900)) - 450;

      for (let i = 0; i < n; i++) {
        const dx = rx[i] - ptr.x;
        const dy = ry[i] - ptr.y;
        const d2 = dx * dx + dy * dy;
        let fx = (rx[i] - x[i]) * K;
        let fy = (ry[i] - y[i]) * K;
        let p = 0;
        if (d2 < reach2) {
          const d = Math.sqrt(d2) + 0.001;
          const f = Math.exp(-d2 * inv2R2);
          const ux = dx / d;
          const uy = dy / d;
          fx += (ux * S - uy * SW) * f;
          fy += (uy * S + ux * SW) * f;
          p = f;
        }
        for (const ripple of ripples) {
          const age = now - ripple.t;
          const rad = age * 0.8;
          const ex = rx[i] - ripple.x;
          const ey = ry[i] - ripple.y;
          const dd = Math.sqrt(ex * ex + ey * ey) + 0.001;
          const off = dd - rad;
          if (off > -120 && off < 120) {
            const b = Math.exp((-off * off) / 1800) * (1 - age / RIPPLE_MS);
            fx += (ex / dd) * b * 6 * (intensity || 0.4);
            fy += (ey / dd) * b * 6 * (intensity || 0.4);
            if (b > p) p = b;
          }
        }
        vx[i] = (vx[i] + fx) * D;
        vy[i] = (vy[i] + fy) * D;
        x[i] += vx[i];
        y[i] += vy[i];
        const s = rx[i] + ry[i] * 0.6 - sweep;
        const sw = s > -220 && s < 220 ? Math.exp((-s * s) / 9800) * 0.3 : 0;
        pr[i] = p > sw ? p : sw;
      }

      ctx.clearRect(0, 0, w, h);

      const lens = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, R * 1.7);
      lens.addColorStop(0, `rgba(${lut[18]},0.16)`);
      lens.addColorStop(1, `rgba(${lut[18]},0)`);
      ctx.fillStyle = lens;
      ctx.fillRect(ptr.x - R * 1.7, ptr.y - R * 1.7, R * 3.4, R * 3.4);

      const shift = t * 0.04;
      const lutIndex = (k: number) => (((rx[k] / w) * 0.85 + (ry[k] / h) * 0.15 + shift) % 1) * 63 | 0;

      // Mesh lines between excited neighbours.
      ctx.lineWidth = 1;
      for (let jj = 0; jj < rows; jj++) {
        for (let ii = 0; ii < cols; ii++) {
          const k = jj * cols + ii;
          const pk = pr[k];
          if (pk < 0.06) continue;
          const color = lut[lutIndex(k)];
          if (ii + 1 < cols) {
            const a = (pk + pr[k + 1]) * 0.5;
            if (a > 0.06) {
              ctx.strokeStyle = `rgba(${color},${(a * 0.55).toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(x[k], y[k]);
              ctx.lineTo(x[k + 1], y[k + 1]);
              ctx.stroke();
            }
          }
          if (jj + 1 < rows) {
            const a = (pk + pr[k + cols]) * 0.5;
            if (a > 0.06) {
              ctx.strokeStyle = `rgba(${color},${(a * 0.55).toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(x[k], y[k]);
              ctx.lineTo(x[k + cols], y[k + cols]);
              ctx.stroke();
            }
          }
        }
      }

      // Idle dots: one batched path of small squares.
      ctx.fillStyle = `rgba(${pal.base},${pal.baseA})`;
      ctx.beginPath();
      for (let z = 0; z < n; z++) if (pr[z] < 0.03) ctx.rect(x[z] - 0.8, y[z] - 0.8, 1.6, 1.6);
      ctx.fill();

      // Active dots: circles sized and colored by excitement.
      for (let z = 0; z < n; z++) {
        const pz = pr[z];
        if (pz < 0.03) continue;
        ctx.fillStyle = `rgba(${lut[lutIndex(z)]},${Math.min(1, pal.baseA + pz * 1.1).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x[z], y[z], 0.9 + pz * 2.6, 0, TAU);
        ctx.fill();
      }

      for (const ripple of ripples) {
        const age = now - ripple.t;
        ctx.strokeStyle = `rgba(${lut[40]},${((1 - age / RIPPLE_MS) * 0.5).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, age * 0.8, 0, TAU);
        ctx.stroke();
      }

      // HUD: dashed guides, ring, crosshair ticks and a coordinates chip.
      const hx = Math.round(ptr.x);
      const hy = Math.round(ptr.y);
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${pal.hud},0.12)`;
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.moveTo(0, hy + 0.5);
      ctx.lineTo(w, hy + 0.5);
      ctx.moveTo(hx + 0.5, 0);
      ctx.lineTo(hx + 0.5, h);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = `rgba(${lut[10]},0.9)`;
      ctx.beginPath();
      ctx.arc(hx, hy, 14, 0, TAU);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(hx - 24, hy);
      ctx.lineTo(hx - 8, hy);
      ctx.moveTo(hx + 8, hy);
      ctx.lineTo(hx + 24, hy);
      ctx.moveTo(hx, hy - 24);
      ctx.lineTo(hx, hy - 8);
      ctx.moveTo(hx, hy + 8);
      ctx.lineTo(hx, hy + 24);
      ctx.stroke();
      const label = `x ${hx}   y ${hy}`;
      ctx.font = '500 11px "Geist Mono", ui-monospace, monospace';
      const tw = ctx.measureText(label).width;
      ctx.fillStyle = `rgba(${pal.chip},0.85)`;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(hx + 18, hy + 18, tw + 18, 24, 7);
      else ctx.rect(hx + 18, hy + 18, tw + 18, 24);
      ctx.fill();
      ctx.strokeStyle = `rgba(${pal.hud},0.14)`;
      ctx.stroke();
      ctx.fillStyle = `rgba(${pal.hud},0.92)`;
      ctx.fillText(label, hx + 27, hy + 34);
      ctx.restore();
    };

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
      if (ptr.x < 0) {
        ptr.x = w * 0.6;
        ptr.y = h * 0.45;
      }
      build();
      if (reduce) frame(performance.now());
    };

    const toCanvas = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const sx = canvas.clientWidth / (box.width || 1);
      const sy = canvas.clientHeight / (box.height || 1);
      return { px: (event.clientX - box.left) * sx, py: (event.clientY - box.top) * sy };
    };

    const onMove = (event: PointerEvent) => {
      const { px, py } = toCanvas(event);
      ptr.inside = px >= 0 && py >= 0 && px <= canvas.clientWidth && py <= canvas.clientHeight;
      if (ptr.inside) {
        ptr.tx = px;
        ptr.ty = py;
        ptr.last = performance.now();
      }
    };

    const onDown = (event: PointerEvent) => {
      if (reduce) return;
      if ((event.target as Element | null)?.closest('a, button')) return;
      const { px, py } = toCanvas(event);
      ripples.push({ x: px, y: py, t: performance.now() });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    // The loop only runs while the hero is on screen.
    let onScreen = true;
    const loop = (now: number) => {
      if (!onScreen) {
        raf = 0;
        return;
      }
      if (!document.hidden) frame(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!reduce && !raf) raf = requestAnimationFrame(loop);
    };

    const section = canvas.parentElement;
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
    });
    visibility.observe(canvas);
    window.addEventListener('pointermove', onMove);
    section?.addEventListener('pointerdown', onDown);
    redrawRef.current = reduce ? () => frame(performance.now()) : null;
    start();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('pointermove', onMove);
      section?.removeEventListener('pointerdown', onDown);
      redrawRef.current = null;
    };
  }, [intensity, spacing]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
