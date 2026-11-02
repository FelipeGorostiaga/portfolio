import { describe, expect, it } from 'vitest';
import books from '../../data/books.json';
import quotes from '../../data/quotes.json';
import { countLabel, coverColors, filterQuotes, filterRated, fromBook, parseTab, sortRated } from '~/lib/library';

const items = books.map(fromBook);

describe('filterRated', () => {
  it('ignores case and surrounding spaces', () => {
    // 6 books by Nietzsche plus "When Nietzsche Wept" by title.
    expect(filterRated(items, '  NIETZSCHE ')).toHaveLength(7);
  });

  it('matches titles', () => {
    expect(filterRated(items, 'sapiens').map((b) => b.title)).toEqual(['Sapiens']);
  });

  it('returns everything for an empty query', () => {
    expect(filterRated(items, '')).toHaveLength(12);
  });
});

describe('sortRated', () => {
  it('sorts by rating, high to low', () => {
    expect(sortRated(items, 'rating', 'desc')[0].title).toBe('Thus Spoke Zarathustra');
  });

  it('sorts by rating, low to high', () => {
    expect(sortRated(items, 'rating', 'asc')[0].title).toBe('21 Lessons for the 21st Century');
  });

  it('sorts by year', () => {
    expect(sortRated(items, 'year', 'asc')[0].year).toBe(1883);
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
