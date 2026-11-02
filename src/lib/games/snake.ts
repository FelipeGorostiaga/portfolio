export const SNAKE_COLS = 20;
export const SNAKE_ROWS = 20;
export const SNAKE_TICK_MS = 100;

export type Point = { x: number; y: number };
export type Direction = 'up' | 'down' | 'left' | 'right';

export type SnakeState = {
  /** Head first. */
  snake: Point[];
  /** Direction for the next step. */
  dir: Direction;
  /** Direction of the last step actually taken; turns are checked against it. */
  lastMoved: Direction;
  apple: Point;
  score: number;
  over: boolean;
};

const DELTAS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };

const KEYS: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export function createSnake(): SnakeState {
  return {
    snake: [{ x: 8, y: 7 }, { x: 8, y: 8 }],
    dir: 'up',
    lastMoved: 'up',
    apple: { x: 8, y: 3 },
    score: 0,
    over: false,
  };
}

type KeyPress = Pick<KeyboardEvent, 'key'> & Partial<Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'>>;

/** Arrow keys steer; with Alt, Ctrl or Meta held they belong to the browser (Alt+← is Back). */
export function keyToDirection({ key, altKey, ctrlKey, metaKey }: KeyPress): Direction | null {
  if (altKey || ctrlKey || metaKey) return null;
  return KEYS[key] ?? null;
}

export function turn(s: SnakeState, d: Direction): SnakeState {
  if (s.over || d === OPPOSITE[s.lastMoved]) return s;
  return { ...s, dir: d };
}

function placeApple(snake: Point[], random: () => number): Point {
  const free: Point[] = [];
  for (let y = 0; y < SNAKE_ROWS; y++) {
    for (let x = 0; x < SNAKE_COLS; x++) {
      if (!snake.some((p) => p.x === x && p.y === y)) free.push({ x, y });
    }
  }
  return free[Math.floor(random() * free.length)];
}

export function stepSnake(s: SnakeState, random = Math.random): SnakeState {
  if (s.over) return s;
  const delta = DELTAS[s.dir];
  const head = { x: s.snake[0].x + delta.x, y: s.snake[0].y + delta.y };
  const eats = samePoint(head, s.apple);
  // The tail moves away this step unless the snake grows.
  const body = eats ? s.snake : s.snake.slice(0, -1);
  const hitsWall = head.x < 0 || head.y < 0 || head.x >= SNAKE_COLS || head.y >= SNAKE_ROWS;
  if (hitsWall || body.some((p) => samePoint(p, head))) {
    return { ...s, over: true };
  }
  const snake = [head, ...body];
  if (!eats) return { ...s, snake, lastMoved: s.dir };
  return { ...s, snake, lastMoved: s.dir, score: s.score + 1, apple: placeApple(snake, random) };
}
