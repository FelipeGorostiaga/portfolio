import { expect, it } from 'vitest';
import { isComplete, visibleProjects } from '~/content/projects';

it('needs url, description and screenshot', () => {
  expect(isComplete({ name: 'X', stack: [], url: 'https://x.dev', description: 'd' })).toBe(false);
  expect(
    isComplete({ name: 'X', stack: [], url: 'https://x.dev', description: 'd', screenshot: '/x.png' }),
  ).toBe(true);
});

it('hides every project at launch', () => {
  expect(visibleProjects).toEqual([]);
});
