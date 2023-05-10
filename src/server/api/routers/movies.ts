import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

const MOVIES_PER_PAGE = 8;

export const moviesRouter = createTRPCRouter({
  getAll: publicProcedure
  .input(z.object({
    value: z.string(),
    skip: z.number().min(0),
    order: z.enum(['desc', 'asc']),
    criteria: z.enum(['rating', 'year']),
  }))
  .query(async ({ input, ctx }) => {

    const orderByClause = input.criteria === 'rating' ? {
      rate: input.order,
    } : { year: input.order };

    const [count, movies] = await ctx.prisma.$transaction([
      ctx.prisma.movie.count(
        {
          where: {
            OR: [
              {
                director: {
                  contains: input.value,
                },
              },
              {
                title: {
                  contains: input.value,
                },
              },
            ],
          },
        },
      ),
      ctx.prisma.movie.findMany({
          where: {
            OR: [
              {
                director: {
                  contains: input.value,
                },
              },
              {
                title: {
                  contains: input.value,
                },
              },
            ],
          },
          orderBy: [
            orderByClause,
          ],
          take: MOVIES_PER_PAGE,
          skip: input.skip,
        },
      ),
    ]);

    return {
      pagination: {
        total: count,
      },
      data: movies,
    };

  }),
});
