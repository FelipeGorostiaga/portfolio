import { describe, expect, it } from 'vitest';
import { createSnake, keyToDirection, stepSnake, turn, type SnakeState } from '~/lib/games/snake';

const at = (over: Partial<SnakeState>): SnakeState => ({ ...createSnake(), ...over });

describe('turn', () => {
  it('ignores reversing', () => {
    expect(turn(createSnake(), 'down').dir).toBe('up');
  });

  it('cannot reverse through two quick turns before a move', () => {
    expect(turn(turn(createSnake(), 'left'), 'down').dir).toBe('left');
  });
});

describe('stepSnake', () => {
  it('moves the head', () => {
    const s = stepSnake(createSnake());
    expect(s.snake).toEqual([{ x: 8, y: 6 }, { x: 8, y: 7 }]);
    expect(s.lastMoved).toBe('up');
  });

  it('grows and scores when eating, and spawns the apple off the snake', () => {
    const s = stepSnake(at({ apple: { x: 8, y: 6 } }), () => 0.43);
    expect(s.snake).toHaveLength(3);
    expect(s.score).toBe(1);
    expect(s.snake).not.toContainEqual(s.apple);
  });

  it('ends the game on a wall', () => {
    const s = stepSnake(at({ snake: [{ x: 4, y: 0 }, { x: 4, y: 1 }] }));
    expect(s.over).toBe(true);
    expect(s.snake[0]).toEqual({ x: 4, y: 0 });
  });

  it('ends the game on its own body', () => {
    const body = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 4 }];
    expect(stepSnake(at({ snake: body, dir: 'up', lastMoved: 'left' })).over).toBe(true);
  });

  it('may move into the tail cell that is leaving', () => {
    const ring = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 4 }, { x: 5, y: 4 }];
    expect(stepSnake(at({ snake: ring, dir: 'up', lastMoved: 'left' })).over).toBe(false);
  });

  it('does nothing after game over', () => {
    const over = at({ over: true });
    expect(stepSnake(over)).toEqual(over);
    expect(turn(over, 'left')).toEqual(over);
  });
});

describe('keyToDirection', () => {
  it('maps arrow keys only', () => {
    expect(keyToDirection('ArrowLeft')).toBe('left');
    expect(keyToDirection('a')).toBeNull();
  });
});
