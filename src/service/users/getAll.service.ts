import { prisma } from '@/configs/database';
import { redisClient } from '@/configs/redis';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class GetAllService {
  public async getAll(limit: number, offset: number) {
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          username: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        take: limit,
        skip: offset,
      }),

      prisma.user.count(),
    ]);

    return {
      data,
      total,
    };
  }
}

export const getAllService = new GetAllService();
