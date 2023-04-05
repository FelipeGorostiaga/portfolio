import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const moviesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany();
  }),
});
