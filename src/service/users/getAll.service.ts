import { prisma } from '@/configs/database';
import { redisClient } from '@/configs/redis';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class GetAllService {
  public async getAll(sessionId: string, limit: number, offset: number) {
    const sessionKey = `session:${sessionId}`;

    const userId = await redisClient.hGet(sessionKey, 'userId');

    if (!userId) throw new NotFoundError('user not found');

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
