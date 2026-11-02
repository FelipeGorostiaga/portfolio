import { type GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import booksData from '../../data/books.json';
import moviesData from '../../data/movies.json';
import quotesData from '../../data/quotes.json';
import RouteHeader from '~/components/layout/RouteHeader';
import Seo from '~/components/layout/Seo';
import SiteShell from '~/components/layout/SiteShell';
import BookCard from '~/components/library/BookCard';
import LibraryControls from '~/components/library/LibraryControls';
import LibraryTabs, { PANEL_ID, tabId } from '~/components/library/LibraryTabs';
import QuoteCard from '~/components/library/QuoteCard';
import styles from '~/components/library/Library.module.css';
import {
  countLabel,
  filterQuotes,
  filterRated,
  fromBook,
  fromMovie,
  parseTab,
  sortRated,
  type LibraryTab,
  type Quote,
  type RatedItem,
  type SortKey,
  type SortOrder,
} from '~/lib/library';

type LibraryProps = { books: RatedItem[]; movies: RatedItem[]; quotes: Quote[] };

/**
 * The pre-rendered page always holds the Books tab: the query isn't known at build time, and the
 * router only reads it after hydration. For a ?tab=movies/quotes link this runs before first paint
 * and hides the tab area until then, so the wrong list never flashes. The timeout un-hides it if
 * the app's JavaScript never loads.
 */
const PENDING_TAB_SCRIPT = `(function(){var t=new URLSearchParams(location.search).get('tab');if(t!=='movies'&&t!=='quotes')return;var c=document.documentElement.classList;c.add('library-pending');setTimeout(function(){c.remove('library-pending');},4000);})();`;

// The library is small and static: read it at build time and filter in the browser.
export const getStaticProps: GetStaticProps<LibraryProps> = async () => ({
  props: {
    books: booksData.map(fromBook),
    movies: moviesData.map(fromMovie),
    quotes: quotesData,
  },
});

export default function LibraryPage({ books, movies, quotes }: LibraryProps) {
  const router = useRouter();
  const tab = parseTab(router.query.tab);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('rating');
  const [order, setOrder] = useState<SortOrder>('desc');
  // Once the router knows the tab: show the tab area and let the count announce changes
  // (not the initial switch from the pre-rendered Books tab).
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    document.documentElement.classList.remove('library-pending');
    setSettled(true);
  }, [router.isReady]);

  const setTab = (next: LibraryTab) => {
    void router.replace({ query: next === 'books' ? {} : { tab: next } }, undefined, { shallow: true, scroll: false });
  };

  const rated = useMemo(
    () => (tab === 'quotes' ? [] : sortRated(filterRated(tab === 'movies' ? movies : books, query), sort, order)),
    [tab, books, movies, query, sort, order],
  );
  const shownQuotes = useMemo(() => (tab === 'quotes' ? filterQuotes(quotes, query) : []), [tab, quotes, query]);
  const count = tab === 'quotes' ? shownQuotes.length : rated.length;

  return (
    <>
      <Seo
        title="Library | Felipe Gorostiaga"
        description="Books, movies and quotes that shaped how I think, rated honestly out of ten."
        path="/library"
      />
      <SiteShell variant="route" current="library">
        <main className="route-main">
          <RouteHeader
            eyebrow="library"
            title={
              <>
                The <span className="accent grad">library</span>
              </>
            }
            lead="Books, movies and quotes that shaped how I think, rated honestly out of ten."
          />

          <script dangerouslySetInnerHTML={{ __html: PENDING_TAB_SCRIPT }} />
          <div className={`enter ${styles.controls}`}>
            <LibraryTabs tab={tab} onChange={setTab} />
            <LibraryControls
              query={query}
              onQuery={setQuery}
              sort={sort}
              onSort={setSort}
              order={order}
              onToggleOrder={() => setOrder((current) => (current === 'desc' ? 'asc' : 'desc'))}
              quotes={tab === 'quotes'}
            />
          </div>

          <div id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(tab)} className={styles.panel}>
            <span className={`mono ${styles.count}`} aria-live={settled ? 'polite' : 'off'}>
              {countLabel(tab, count)}
            </span>
            <div className={styles.grid}>
              {tab === 'quotes'
                ? shownQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} />)
                : rated.map((item) => <BookCard key={item.id} item={item} />)}
            </div>
            {count === 0 && <p className={styles.empty}>Nothing matches that search yet.</p>}
          </div>
        </main>
      </SiteShell>
    </>
  );
}
