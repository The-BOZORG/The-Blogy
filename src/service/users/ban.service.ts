import { prisma } from '@/configs/database';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class BanUserService {
  public async banUser(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundError('user not found');

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: 'BANNED',
      },
    });
  }
}

export const banUserService = new BanUserService();
