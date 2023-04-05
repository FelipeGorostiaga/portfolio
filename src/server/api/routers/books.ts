import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const booksRouter = createTRPCRouter({

  getAll: publicProcedure
    .input(z.object({
      value: z.string(),
      order: z.enum(['desc', 'asc']),
      criteria: z.enum(['rating', 'year']),
    }))
    .query(({ input, ctx }) => {

      const orderByClause = input.criteria === 'rating' ? {
        rate: input.order,
      } : { year: input.order };

      // orderBy: [
      //             {
      //               rate: input.order,
      //             },
      //           ],

      return ctx.prisma.book.findMany(
        {
          where: {
            OR: [
              {
                author: {
                  contains: input.value,
                  mode: 'insensitive',
                },
              },
              {
                title: {
                  contains: input.value,
                  mode: 'insensitive',
                },
              },
            ],
          },
          take: 10,
        },
      );
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
