import { prisma } from '@/configs/database';
import { AuthenticatedError } from '@/shared/errors/authenticatedError';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class DeleteBlogService {
  public async deleteBlog(
    userId: string,
    blogId: string,
    role: string,
  ): Promise<void> {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) throw new NotFoundError('blog not found');

    if (role !== 'ADMIN' && blog.authorId !== userId)
      throw new AuthenticatedError('You are not allowed to delete this blog');

    await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
  }
}

export const deleteBlogService = new DeleteBlogService();
