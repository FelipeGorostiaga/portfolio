import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

const BOOKS_PER_PAGE = 6;

export const booksRouter = createTRPCRouter({

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

      const [count, books] = await ctx.prisma.$transaction([
        ctx.prisma.book.count(
          {
            where: {
              OR: [
                {
                  author: {
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
        ctx.prisma.book.findMany({
            where: {
              OR: [
                {
                  author: {
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
            take: BOOKS_PER_PAGE,
            skip: input.skip,
          },
        ),
      ]);

      return {
        pagination: {
          total: count,
        },
        data: books,
      };

    }),

  create: protectedProcedure
    .input(
      z.object({
          title: z.string().min(2),
          author: z.string().min(2),
          year: z.string(),
          rate: z.number().min(0).max(10),
          imgUrl: z.string().url(),
        },
      )).mutation(({ ctx, input }) => {

      return ctx.prisma.book.create({
        data: {
          title: input.title,
          author: input.author,
          year: input.year,
          rate: input.rate,
          imgUrl: input.imgUrl,
        },
      });
    }),
});
