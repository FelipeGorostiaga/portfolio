import { createTRPCRouter } from '~/server/api/trpc';
import { booksRouter } from '~/server/api/routers/books';
import { moviesRouter } from '~/server/api/routers/movies';
import { quotesRouter } from '~/server/api/routers/quotes';

export const appRouter = createTRPCRouter({
  books: booksRouter,
  movies: moviesRouter,
  quotes: quotesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
