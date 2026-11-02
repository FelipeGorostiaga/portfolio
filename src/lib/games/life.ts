export const LIFE_COLS = 64;
export const LIFE_ROWS = 36;

export type LifeState = {
  cols: number;
  rows: number;
  /** 1 = alive, 0 = dead. */
  cells: Uint8Array;
  /** Generations a cell has stayed alive; drives its color. */
  age: Uint16Array;
  /** 1 while alive, then fades ×0.78 per generation; drives the trail. */
  heat: Float32Array;
  generation: number;
  population: number;
};

const HEAT_DECAY = 0.78;
const MAX_AGE = 999;

// Gosper glider gun and R-pentomino, from docs/design/Games.dc.html.
const GLIDER_GUN = [
  [24, 0], [22, 1], [24, 1], [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2],
  [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3], [0, 4], [1, 4], [10, 4],
  [16, 4], [20, 4], [21, 4], [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5],
  [22, 5], [24, 5], [10, 6], [16, 6], [24, 6], [11, 7], [15, 7], [12, 8], [13, 8],
];
const R_PENTOMINO = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];

export function createLife(cols = LIFE_COLS, rows = LIFE_ROWS): LifeState {
  const size = cols * rows;
  return {
    cols,
    rows,
    cells: new Uint8Array(size),
    age: new Uint16Array(size),
    heat: new Float32Array(size),
    generation: 0,
    population: 0,
  };
}

export function cellIndex(s: LifeState, x: number, y: number): number {
  const col = ((x % s.cols) + s.cols) % s.cols;
  const row = ((y % s.rows) + s.rows) % s.rows;
  return row * s.cols + col;
}

/** Sets one cell; returns false (and leaves its age alone) when it already had that value. */
export function setCell(s: LifeState, index: number, alive: boolean): boolean {
  const value = alive ? 1 : 0;
  if (s.cells[index] === value) return false;
  s.population += value - s.cells[index];
  s.cells[index] = value;
  s.age[index] = 0;
  if (alive) s.heat[index] = 1;
  return true;
}

export function clearLife(s: LifeState): void {
  s.cells.fill(0);
  s.age.fill(0);
  s.heat.fill(0);
  s.generation = 0;
  s.population = 0;
}

export function seedGliderGun(s: LifeState): void {
  clearLife(s);
  for (const [x, y] of GLIDER_GUN) setCell(s, cellIndex(s, x + 2, y + 3), true);
  for (const [x, y] of R_PENTOMINO) setCell(s, cellIndex(s, x + 48, y + 22), true);
}

export function shuffleLife(s: LifeState, random = Math.random, density = 0.22): void {
  clearLife(s);
  for (let k = 0; k < s.cells.length; k++) {
    if (random() < density) setCell(s, k, true);
  }
}

export function stepLife(s: LifeState): void {
  const { cols: C, rows: R, cells: g, age, heat } = s;
  const next = new Uint8Array(C * R);
  let population = 0;
  for (let y = 0; y < R; y++) {
    const above = ((y - 1 + R) % R) * C;
    const row = y * C;
    const below = ((y + 1) % R) * C;
    for (let x = 0; x < C; x++) {
      const left = (x - 1 + C) % C;
      const right = (x + 1) % C;
      const neighbours =
        g[above + left] + g[above + x] + g[above + right] +
        g[row + left] + g[row + right] +
        g[below + left] + g[below + x] + g[below + right];
      const k = row + x;
      const alive = g[k] ? neighbours === 2 || neighbours === 3 : neighbours === 3;
      if (alive) {
        next[k] = 1;
        age[k] = g[k] ? Math.min(age[k] + 1, MAX_AGE) : 0;
        heat[k] = 1;
        population++;
      } else {
        age[k] = 0;
        heat[k] *= HEAT_DECAY;
      }
    }
  }
  s.cells = next;
  s.generation += 1;
  s.population = population;
}
