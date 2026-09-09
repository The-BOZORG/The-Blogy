import { prisma } from '@/configs/database';

export class GetAllBlogService {
  public async getAll(limit: number, offset: number) {
    const [data, total] = await Promise.all([
      prisma.blog.findMany({
        take: limit,
        skip: offset,

        include: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      }),

      prisma.blog.count(),
    ]);

    return {
      data,
      total,
    };
  }
}

export const getAllBlogService = new GetAllBlogService();
