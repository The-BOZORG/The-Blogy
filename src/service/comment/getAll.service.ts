import { prisma } from '@/configs/database';

export class GetAllCommentService {
  public async getAll(limit: number, offset: number) {
    const [data, total] = await Promise.all([
      prisma.comment.findMany({
        take: limit,
        skip: offset,

        include: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },

          blog: {
            select: {
              authorId: true,
              slug: true,
            },
          },
        },
      }),

      prisma.comment.count(),
    ]);

    return {
      data,
      total,
    };
  }
}

export const getAllCommentService = new GetAllCommentService();
