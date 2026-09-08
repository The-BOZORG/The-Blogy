import { prisma } from '@/configs/database';

export class DeleteUserService {
  public async deleteUser(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

export const deleteUserService = new DeleteUserService();
