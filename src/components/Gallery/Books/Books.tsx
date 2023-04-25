import BookItem from './BookItem/BookItem';
import BookFilters from './BookFilters/BookFilters';
import { api } from '~/utils/api';
import { useEffect, useMemo, useState } from 'react';
import BookItemSkeleton from '~/components/Gallery/Books/BookItem/BookItemSkeleton';
import { Pagination } from '@mui/material';
import useBreakpoints from '~/hooks/useBreakpoints';

export type SortCriteria = 'rating' | 'year';
export type SortDirection = 'asc' | 'desc';
const BOOKS_PER_PAGE = 6;

const Books = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [activeSearchValue, setActiveSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const { sm } = useBreakpoints();

  const skipValue = useMemo(() => {
    return page === 1 ? 0 : ((page - 1) * BOOKS_PER_PAGE);
  }, [page]);

  const { data, isLoading } = api.books.getAll.useQuery({
    value: activeSearchValue,
    criteria: sortCriteria,
    order: sortDirection,
    skip: skipValue,
  });

  const books = data?.data;
  const total = data?.pagination.total;

  const handleSearch = () => {
    // trigger search on action instead of input change (query value)
    setActiveSearchValue(searchValue);
  };

  const disabled = isLoading ? true : (books ? books.length <= 1 : true);

  const filterProps = {
    searchValue,
    setSearchValue,
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
    handleSearch,
    disabled,
  };

  useEffect(() => {
    setPage(1);
  }, [activeSearchValue, sortDirection, sortCriteria]);

  const totalPages = useMemo(() => {
    if (total) {
      return Math.ceil(total / BOOKS_PER_PAGE);
    }
    return 0;
  }, [data]);

  const showEmptyState = !isLoading && books?.length === 0;
  const showPagination = !isLoading && !!total && (total > BOOKS_PER_PAGE);

  return (
    <section className="px-8 max-w-7xl w-full md:px-14 2xl:px-0 flex flex-col gap-0">
      <h1
        className="text-4xl text-sans font-bold mb-1 md:mb-2 text-neutral-800 dark:text-neutral-100">
        My Books
      </h1>
      <BookFilters {...filterProps} />
      <div
        className="grid grid-cols-1 place-items-start gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 min-h-[504px]">
        {isLoading && Array.from(Array(6)).map((n, idx) => {
          return <BookItemSkeleton key={idx} />;
        })}
        {!isLoading && books?.map(book => {
          return <BookItem {...book} key={book.id} />;
        })}
        {
          showEmptyState &&
          <div className="pt-6 pl-2 text-slate-800 dark:text-neutral-300 w-full text-2xl">No results were found...</div>
        }
      </div>
      {
        showPagination &&
        <div className="w-full flex flex-row items-center justify-center mt-10">
          <Pagination count={totalPages} page={page} onChange={(e, page) => setPage(page)} size={sm? 'small' : 'large'}/>
        </div>
      }
    </section>
  );
};

export default Books;
