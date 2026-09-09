import { prisma } from '@/configs/database';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class ShowMeService {
  public async showMe(userId: string) {
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

export const showMeService = new ShowMeService();
