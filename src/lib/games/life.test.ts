import { describe, expect, it } from 'vitest';
import {
  cellIndex,
  clearLife,
  createLife,
  seedGliderGun,
  setCell,
  shuffleLife,
  stepLife,
  type LifeState,
} from '~/lib/games/life';

const aliveAt = (s: LifeState) =>
  [...s.cells].flatMap((v, i) => (v ? [[i % s.cols, Math.floor(i / s.cols)]] : [])).sort();

const place = (s: LifeState, points: number[][]) =>
  points.forEach(([x, y]) => setCell(s, cellIndex(s, x, y), true));

describe('stepLife', () => {
  it('oscillates a blinker with period 2', () => {
    const s = createLife();
    place(s, [[10, 10], [11, 10], [12, 10]]);
    stepLife(s);
    expect(aliveAt(s)).toEqual([[11, 11], [11, 10], [11, 9]].sort());
    stepLife(s);
    expect(aliveAt(s)).toEqual([[10, 10], [11, 10], [12, 10]].sort());
    expect(s.generation).toBe(2);
  });

  it('moves a glider one cell diagonally every 4 generations', () => {
    const s = createLife();
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    place(s, glider);
    for (let i = 0; i < 4; i++) stepLife(s);
    expect(aliveAt(s)).toEqual(glider.map(([x, y]) => [x + 1, y + 1]).sort());
  });

  it('wraps around the edges', () => {
    const s = createLife();
    place(s, [[63, 10], [0, 10], [1, 10]]);
    stepLife(s);
    expect(aliveAt(s)).toEqual([[0, 9], [0, 10], [0, 11]].sort());
  });

  it('cools dead cells by 0.78 per generation and ages survivors', () => {
    const s = createLife();
    place(s, [[5, 5]]);
    stepLife(s);
    expect(s.heat[cellIndex(s, 5, 5)]).toBeCloseTo(0.78);
    stepLife(s);
    expect(s.heat[cellIndex(s, 5, 5)]).toBeCloseTo(0.6084);

    const block = createLife();
    place(block, [[0, 0], [1, 0], [0, 1], [1, 1]]);
    stepLife(block);
    stepLife(block);
    expect(block.age[cellIndex(block, 0, 0)]).toBe(2);
  });
});

describe('seeds', () => {
  it('seeds the glider gun and R-pentomino', () => {
    const s = createLife();
    seedGliderGun(s);
    expect(s.population).toBe(41);
    expect(s.generation).toBe(0);
  });

  it('shuffles with the given density', () => {
    const s = createLife();
    shuffleLife(s, () => 0.1);
    expect(s.population).toBe(64 * 36);
    shuffleLife(s, () => 0.5);
    expect(s.population).toBe(0);
  });

  it('clears everything', () => {
    const s = createLife();
    seedGliderGun(s);
    clearLife(s);
    expect(s.population).toBe(0);
    expect(s.generation).toBe(0);
  });
});

describe('setCell', () => {
  it('reports a change and leaves an already-set cell untouched', () => {
    const s = createLife();
    const k = cellIndex(s, 5, 5);
    expect(setCell(s, k, true)).toBe(true);
    stepLife(s); // a lone cell dies...
    expect(setCell(s, k, true)).toBe(true); // ...so painting it again is a change
    s.age[k] = 4;
    expect(setCell(s, k, true)).toBe(false); // repainting a live cell keeps its age
    expect(s.age[k]).toBe(4);
    expect(s.population).toBe(1);
    expect(setCell(s, k, false)).toBe(true);
    expect(s.population).toBe(0);
  });
});
