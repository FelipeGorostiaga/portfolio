import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const booksRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),

});