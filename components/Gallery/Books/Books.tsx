import BookItem from './BookItem/BookItem';
import BookFilters from './BookFilters/BookFilters';

const booksMocks = [
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 7,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'The Lord of the Rings',
    author: 'Friedrich Nietzsche',
    score: 6,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 7,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 7,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 2.5,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 10,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 2.4,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 3,
    imgUrl: '/mocks/zarathustra.jpg',
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    score: 9.5,
    imgUrl: '/mocks/zarathustra.jpg',
  },
];

const Books = () => {

  return (
    <section className="px-20">
      <h1
        className="text-3xl md:text-6xl text-sans font-bold mb-1 md:mb-3 text-neutral-800 dark:text-neutral-100">
        Books
      </h1>
      <BookFilters />
      <div className='grid grid-cols-4 gap-10'>
        {booksMocks.map(book => {
          return <BookItem {...book} key={book.title} />;
        })}
      </div>
    </section>
  );
};

export default Books;
