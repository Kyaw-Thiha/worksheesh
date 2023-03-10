import { createTRPCRouter, protectedProcedure } from "@server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  delete: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.delete({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
