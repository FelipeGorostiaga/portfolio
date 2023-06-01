import BookItem from './BookItem/BookItem';
import { api } from '~/utils/api';
import { useEffect, useMemo, useState } from 'react';
import BookItemSkeleton from '~/components/Gallery/Books/BookItem/BookItemSkeleton';
import { Pagination } from '@mui/material';
import useBreakpoints from '~/hooks/useBreakpoints';
import { BOOKS_PER_PAGE, type SortCriteria, type SortDirection } from '~/utils/constants/gallery';
import Filters from '~/components/Gallery/Filters/Filters';


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

  const books = useMemo(() => data?.data, [data]);
  const total = useMemo(() => data?.pagination.total, [data]);

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
    searchPlaceholder: "Search by title, author...",
  };

  useEffect(() => {
    setPage(1);
  }, [activeSearchValue, sortDirection, sortCriteria]);

  const totalPages = useMemo(() => {
    if (total) {
      return Math.ceil(total / BOOKS_PER_PAGE);
    }
    return 0;
  }, [total]);

  const showEmptyState = !isLoading && books?.length === 0;
  const showPagination = !isLoading && !!total && (total > BOOKS_PER_PAGE);

  return (
    <section className="px-8 max-w-7xl w-full md:px-14 2xl:px-0 flex flex-col gap-0 overflow-auto">
      <h1
        className="text-2xl md:text-4xl md:mb-1 font-semibold font-sans text-neutral-800 dark:text-neutral-100">
        Library
      </h1>
      <Filters {...filterProps} />
      <div
        className="flex flex-col place-items-start gap-4 md:gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 min-h-[504px] md:mt-2">
        {isLoading && Array.from(Array(6)).map((n, idx) => {
          return <BookItemSkeleton key={idx} />;
        })}
        {!isLoading && books?.map(book => {
          return <BookItem {...book} key={book.id} />;
        })}
        {
          showEmptyState &&
          <div className="pt-6 pl-2 text-base md:text-lg text-slate-800 dark:text-neutral-300 w-full lg:text-xl">No results were found...</div>
        }
      </div>
      {
        showPagination &&
        <div className="w-full flex flex-row items-center justify-center mt-10">
          <Pagination count={totalPages} page={page} onChange={(e, page) => setPage(page)}
                      size={sm ? 'small' : 'large'} />
        </div>
      }
    </section>
  );
};

export default Books;
