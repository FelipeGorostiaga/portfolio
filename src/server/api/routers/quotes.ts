import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import { QUOTES_PER_PAGE } from '~/utils/constants/gallery';

export const quotesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      value: z.string(),
      skip: z.number().min(0),
    }))
    .query(async ({ input, ctx }) => {
      const [count, quotes] = await ctx.prisma.$transaction([
        ctx.prisma.quote.count(
          {
            where: {
              OR: [
                {
                  text: {
                    contains: input.value,
                  },
                },
                {
                  author: {
                    contains: input.value,
                  },
                },
                {
                  reference: {
                    contains: input.value,
                  },
                }
              ],
            },
          },
        ),
        ctx.prisma.quote.findMany({
          where: {
            OR: [
              {
                text: {
                  contains: input.value,
                },
              },
              {
                author: {
                  contains: input.value,
                },
              },
              {
                reference: {
                  contains: input.value,
                },
              }
            ],
          },
            take: QUOTES_PER_PAGE,
            skip: input.skip,
          },
        ),
      ]);

      return {
        pagination: {
          total: count,
        },
        data: quotes,
      };
    }),
});
