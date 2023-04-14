import BookItem from './BookItem/BookItem';
import BookFilters from './BookFilters/BookFilters';
import { api } from '~/utils/api';
import { useState } from 'react';
import BookItemSkeleton from '~/components/Gallery/Books/BookItem/BookItemSkeleton';

export type SortCriteria = 'rating' | 'year';
export type SortDirection = 'asc' | 'desc';

const Books = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [activeSearchValue, setActiveSearchValue] = useState('');

  const { data: books, refetch: refetchBooks, isLoading } = api.books.getAll.useQuery({
    value: activeSearchValue,
    criteria: sortCriteria,
    order: sortDirection,
  });

  const handleSearch = () => {
    // trigger search on action instead of input change (query value)
    setActiveSearchValue(searchValue);
  };

  const filterProps = {
    searchValue,
    setSearchValue,
    sortCriteria,
    setSortCriteria,
    sortDirection,
    setSortDirection,
    handleSearch,
    disabled: isLoading || (books!.length <= 1),
  };

  return (
    <section className="px-8 max-w-7xl w-full md:px-14 2xl:px-0">
      <h1
        className="text-4xl text-sans font-bold mb-1 md:mb-3 text-neutral-800 dark:text-neutral-100">
        Books
      </h1>
      <BookFilters {...filterProps} />
      <div
        className="grid grid-cols-1 place-items-center gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        {isLoading && Array.from(Array(6)).map((n, idx) => {
          return <BookItemSkeleton key={idx} />;
        })}
        {!isLoading && books?.map(book => {
          return <BookItem {...book} key={book.id} />;
        })}
        {
          (!isLoading && books?.length === 0) &&
          <div className="pt-6 pl-2 text-slate-800 dark:text-neutral-300 w-full text-2xl">No results were found...</div>
        }
      </div>
    </section>
  );
};

export default Books;
