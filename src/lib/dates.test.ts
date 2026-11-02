import { expect, it } from 'vitest';
import { formatRange } from '~/lib/dates';

it('formats open and closed ranges with an en dash', () => {
  expect(formatRange('2024-02', null)).toBe('Feb 2024 – Now');
  expect(formatRange('2023-03', '2024-02')).toBe('Mar 2023 – Feb 2024');
});
