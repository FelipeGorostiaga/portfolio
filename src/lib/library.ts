export type RawBook = { id: number; title: string; author: string; year: number; score: number };
export type RawMovie = { id: number; title: string; director: string; year: number; score: number };
export type Quote = { id: number; text: string; author: string; reference?: string | null };

/** A book or a movie: `creator` is the author or the director. */
export type RatedItem = { id: number; title: string; creator: string; year: number; score: number };

export type LibraryTab = 'books' | 'movies' | 'quotes';
export type SortKey = 'rating' | 'year' | 'title';
export type SortOrder = 'desc' | 'asc';

/** Quotes longer than this get a smaller blockquote. */
export const LONG_QUOTE = 220;

const TABS: readonly LibraryTab[] = ['books', 'movies', 'quotes'];

export function fromBook(book: RawBook): RatedItem {
  return { id: book.id, title: book.title, creator: book.author, year: book.year, score: book.score };
}

export function fromMovie(movie: RawMovie): RatedItem {
  return { id: movie.id, title: movie.title, creator: movie.director, year: movie.year, score: movie.score };
}

const normalize = (query: string) => query.trim().toLowerCase();

export function filterRated(items: RatedItem[], query: string): RatedItem[] {
  const needle = normalize(query);
  if (!needle) return items;
  return items.filter((item) => `${item.title} ${item.creator}`.toLowerCase().includes(needle));
}

export function sortRated(items: RatedItem[], key: SortKey, order: SortOrder): RatedItem[] {
  const direction = order === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const diff =
      key === 'title' ? a.title.localeCompare(b.title) : key === 'year' ? a.year - b.year : a.score - b.score;
    return diff * direction;
  });
}

export function filterQuotes(quotes: Quote[], query: string): Quote[] {
  const needle = normalize(query);
  if (!needle) return quotes;
  return quotes.filter((quote) =>
    [quote.text, quote.author, quote.reference ?? ''].some((field) => field.toLowerCase().includes(needle)),
  );
}

export function parseTab(value: string | string[] | undefined): LibraryTab {
  return TABS.find((tab) => tab === value) ?? 'books';
}
