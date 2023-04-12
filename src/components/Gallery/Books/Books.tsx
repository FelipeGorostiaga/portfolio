import BookItem from './BookItem/BookItem';
import BookFilters from './BookFilters/BookFilters';
import { api } from '~/utils/api';
import { useState } from 'react';

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
        {books?.map(book => {
          return <BookItem {...book} key={book.id} />;
        })}
      </div>
    </section>
  );
};

export default Books;
