import BookItem from './BookItem/BookItem';
import { useEffect, useMemo, useState } from 'react';
import BookItemSkeleton from '~/components/Gallery/Books/BookItem/BookItemSkeleton';
import { Pagination } from '@mui/material';
import useBreakpoints from '~/hooks/useBreakpoints';
import {
  BOOKS_PER_PAGE,
  DEBOUNCE_DELAY,
  type SortCriteria,
  type SortDirection,
} from '~/utils/constants/gallery';
import Filters from '~/components/Gallery/Filters/Filters';
import useDebounce from '~/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '~/server/gallery/books';

const Books = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, DEBOUNCE_DELAY);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);
  const { sm } = useBreakpoints();

  const { data: paginatedBooks, isLoading } = useQuery(
    ['books', debouncedSearchValue, sortCriteria, sortDirection, page],
    () => fetchBooks(page, debouncedSearchValue, sortCriteria, sortDirection),
    {
      keepPreviousData: true,
      staleTime: 5000,
    },
  );

  const books = useMemo(() => paginatedBooks?.data, [paginatedBooks]);
  const total = useMemo(() => paginatedBooks?.total, [paginatedBooks]);
  const totalPages = useMemo(
    () => paginatedBooks?.totalPages,
    [paginatedBooks],
  );

  const disabled = isLoading || !books || books?.length <= 1;

  const filterProps = {
    searchValue,
    setSearchValue,
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
    disabled,
    searchPlaceholder: 'Search by title, author...',
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchValue, sortDirection, sortCriteria]);

  const showEmptyState = !isLoading && books?.length === 0;
  const showPagination = !isLoading && !!total && total > BOOKS_PER_PAGE;

  return (
    <section className="flex w-full max-w-7xl flex-col gap-0 overflow-auto px-8 md:px-14 2xl:px-0">
      <h1 className="font-sans text-2xl font-semibold text-neutral-800 dark:text-neutral-100 md:mb-1 md:text-4xl">
        Library
      </h1>
      <Filters {...filterProps} />
      <div className="flex min-h-[504px] flex-col place-items-start gap-4 overflow-hidden sm:grid sm:grid-cols-2 md:mt-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3">
        {isLoading &&
          Array.from(Array(6)).map((n, idx) => {
            return <BookItemSkeleton key={idx} />;
          })}
        {!isLoading &&
          books?.map((book) => {
            return <BookItem {...book} key={book.id} />;
          })}
        {showEmptyState && (
          <div className="w-full pl-2 pt-6 text-base text-slate-800 dark:text-neutral-300 md:text-lg lg:text-xl">
            No results were found...
          </div>
        )}
      </div>
      {showPagination && (
        <div className="mt-10 flex w-full flex-row items-center justify-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
            size={sm ? 'small' : 'large'}
          />
        </div>
      )}
    </section>
  );
};

export default Books;
