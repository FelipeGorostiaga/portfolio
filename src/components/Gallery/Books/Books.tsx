import BookItem from './BookItem/BookItem';
import BookFilters from './BookFilters/BookFilters';
import { api } from '~/utils/api';
import { useState } from 'react';

const booksMocks = [
  {
    id: '1',
    title: 'Behave',
    author: 'Robert M Sapolsky',
    score: 8.5,
    imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0995/9780099575061.jpg',
    year: '1908',
  },
  {
    id: '2',
    title: 'The Lord of the Rings',
    author: 'Friedrich Nietzsche',
    score: 6,
    imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1404/9780140441185.jpg',
    year: '2021',
  },
  {
    id: '3',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '2021',
  },
  {
    id: '4',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 7,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '2021',
  },
  {
    id: '5',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '2021',
  },
  {
    id: '6',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 2.5,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '2021',
  },
  {
    id: '7',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '2021',
  },
  {
    id: '8',
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    score: 2.4,
    imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3079/9780307950949.jpg',
    year: '2021',
  },
  {
    id: '9',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 3,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '1967',
  },
  {
    id: '10',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 9.5,
    imgUrl: '/mocks/zarathustra.jpg',
    year: '2021',
  },
];

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
