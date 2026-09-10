import { prisma } from '@/configs/database';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class MuteUserService {
  public async muteUser(userId: string): Promise<void> {
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
        isActive: 'MUTE',
      },
    });
  }
}

export const muteUserService = new MuteUserService();
