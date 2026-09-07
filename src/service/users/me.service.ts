import { prisma } from '@/configs/database';
import { redisClient } from '@/configs/redis';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class ShowMeServices {
  public async showMe(sessionId: string) {
    const sessionKey = `session:${sessionId}`;

    const userId = await redisClient.hGet(sessionKey, 'userId');

    if (!userId) {
      throw new NotFoundError('user not found');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('user not found');
    }

    return user;
  }
}
export const showMeServices = new ShowMeServices();
