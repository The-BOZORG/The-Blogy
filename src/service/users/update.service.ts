import { prisma } from '@/configs/database';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { UserData } from '@/shared/interfaces';

export class UpdateUserService {
  public async updateUser(userId: string, body: UserData): Promise<UserData> {
    const { username, email } = body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
      },
    });

    if (!user) throw new NotFoundError('user not found');

    return user;
  }
}
export const updateUserService = new UpdateUserService();
