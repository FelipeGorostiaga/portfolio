import { describe, expect, it } from 'vitest';
import books from '../../data/books.json';
import movies from '../../data/movies.json';
import quotes from '../../data/quotes.json';
import {
  countLabel,
  coverColors,
  filterQuotes,
  filterRated,
  formatYear,
  fromBook,
  fromMovie,
  parseTab,
  sortRated,
} from '~/lib/library';

const items = books.map(fromBook);

describe('library data', () => {
  it.each([
    ['books', items],
    ['movies', movies.map(fromMovie)],
  ])('%s have unique ids, a title, a creator, a year and a score out of ten', (_, list) => {
    expect(new Set(list.map((item) => item.id)).size).toBe(list.length);
    for (const item of list) {
      expect(item.title.trim(), `id ${item.id}`).not.toBe('');
      expect(item.creator.trim(), item.title).not.toBe('');
      expect(Number.isInteger(item.year), item.title).toBe(true);
      expect(item.score >= 0 && item.score <= 10, item.title).toBe(true);
    }
  });
});

describe('filterRated', () => {
  it('ignores case and surrounding spaces', () => {
    // 6 books by Nietzsche plus "When Nietzsche Wept" by title.
    expect(filterRated(items, '  NIETZSCHE ')).toHaveLength(7);
  });

  it('matches titles', () => {
    expect(filterRated(items, 'sapiens').map((b) => b.title)).toEqual(['Sapiens']);
  });

  it('returns everything for an empty query', () => {
    expect(filterRated(items, '')).toHaveLength(items.length);
  });
});

describe('sortRated', () => {
  const scores = (order: 'asc' | 'desc') => sortRated(items, 'rating', order).map((b) => b.score);

  it('sorts by rating, high to low', () => {
    const sorted = scores('desc');
    expect(sorted.every((score, i) => i === 0 || sorted[i - 1] >= score)).toBe(true);
  });

  it('keeps the data order between equal ratings', () => {
    // Zarathustra is the first 10 in the data, ahead of the later 10s.
    expect(sortRated(items, 'rating', 'desc')[0].title).toBe('Thus Spoke Zarathustra');
  });

  it('sorts by rating, low to high', () => {
    const sorted = scores('asc');
    expect(sorted.every((score, i) => i === 0 || sorted[i - 1] <= score)).toBe(true);
  });

  it('sorts by year, with years before the common era first', () => {
    expect(sortRated(items, 'year', 'asc')[0].title).toBe('The Art of War');
  });

  it('sorts by title', () => {
    expect(sortRated(items, 'title', 'asc')[0].title).toBe('21 Lessons for the 21st Century');
  });

  it('does not mutate its input', () => {
    const before = items.map((b) => b.id);
    sortRated(items, 'title', 'desc');
    expect(items.map((b) => b.id)).toEqual(before);
  });
});

describe('filterQuotes', () => {
  it('matches the reference field', () => {
    const withRef = quotes.find((q) => 'reference' in q && q.reference);
    expect(withRef).toBeDefined();
    const reference = (withRef as { reference: string }).reference;
    expect(filterQuotes(quotes, reference.toUpperCase())).toContainEqual(withRef);
  });
});

describe('countLabel', () => {
  it('uses the singular for one item', () => {
    expect(countLabel('books', 12)).toBe('12 books');
    expect(countLabel('movies', 1)).toBe('1 movie');
    expect(countLabel('quotes', 0)).toBe('0 quotes');
  });
});

describe('formatYear', () => {
  it('shows negative years as BC', () => {
    expect(formatYear(-500)).toBe('500 BC');
    expect(formatYear(180)).toBe('180');
    expect(formatYear(1883)).toBe('1883');
  });
});

describe('coverColors', () => {
  it('cycles the six design gradients by id', () => {
    expect(coverColors(1)).toEqual(['#166534', '#052E16']);
    expect(coverColors(6)).toEqual(['#44403C', '#0C0A09']);
    expect(coverColors(7)).toEqual(coverColors(1));
  });
});

describe('parseTab', () => {
  it('accepts known tabs', () => {
    expect(parseTab('quotes')).toBe('quotes');
  });

  it('falls back to books for junk, arrays or nothing', () => {
    expect(parseTab('blue')).toBe('books');
    expect(parseTab(['movies', 'quotes'])).toBe('books');
    expect(parseTab(undefined)).toBe('books');
  });
});
