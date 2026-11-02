import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { isComplete, projects, visibleProjects } from '~/content/projects';

it('needs url, description and screenshot', () => {
  expect(isComplete({ name: 'X', stack: [], url: 'https://x.dev', description: 'd' })).toBe(false);
  expect(
    isComplete({ name: 'X', stack: [], url: 'https://x.dev', description: 'd', screenshot: '/x.png' }),
  ).toBe(true);
});

it('shows Greenboom and Splitsea', () => {
  expect(visibleProjects.map((p) => p.name)).toEqual(['Greenboom', 'Splitsea']);
});

it('points every screenshot at a file in public/', () => {
  for (const { screenshot } of projects) {
    if (screenshot) expect(existsSync(join(process.cwd(), 'public', screenshot))).toBe(true);
  }
});

it('keeps em dashes out of the copy', () => {
  for (const { description } of projects) expect(description ?? '').not.toContain('—');
});
