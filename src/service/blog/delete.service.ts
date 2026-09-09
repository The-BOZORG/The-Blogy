import { prisma } from '@/configs/database';

export class DeleteBlogService {
  public async DeleteBlogService(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
export const deleteBlogService = new DeleteBlogService();
