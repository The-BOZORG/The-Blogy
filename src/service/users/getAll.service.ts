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
        where: {
          id: userId,
        },
        take: limit,
        skip: offset,
      }),

      prisma.user.count({
        where: {
          id: userId,
        },
      }),
    ]);

    return {
      data,
      total,
    };
  }
}

export const getAllService = new GetAllService();
