import BookItem from './BookItem/BookItem';
import BookFilters from './BookFilters/BookFilters';

const booksMocks = [
  {
    id: '1',
    title: 'Behave',
    author: 'Robert M Sapolsky',
    score: 8.5,
    imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0995/9780099575061.jpg',
  },
  {
    id: '2',
    title: 'The Lord of the Rings',
    author: 'Friedrich Nietzsche',
    score: 6,
    imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1404/9780140441185.jpg',
  },
  {
    id: '3',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    id: '4',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 7,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    id: '5',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    id: '6',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 2.5,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    id: '7',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    id: '8',
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    score: 2.4,
    imgUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3079/9780307950949.jpg',
  },
  {
    id: '9',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 3,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    id: '10',
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 9.5,
    imgUrl: '/mocks/zarathustra.jpg',
  },
];

const Books = () => {
  return (
    <section className="px-8 md:px-20 w-full">
      <h1
        className="text-3xl md:text-6xl text-sans font-bold mb-1 md:mb-3 text-neutral-800 dark:text-neutral-100">
        Books
      </h1>
      <BookFilters />
      <div
        className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-10">
        {booksMocks.map(book => {
          return <BookItem {...book} key={book.id} />;
        })}
      </div>
    </section>
  );
};

export default Books;
