import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const quotesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.quote.findMany();
  }),
});
