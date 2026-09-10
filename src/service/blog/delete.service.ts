import { prisma } from '@/configs/database';
import { AuthorizedError } from '@/shared/errors/authorizedError';
import { NotFoundError } from '@/shared/errors/notFoundError';

import fs from 'fs/promises';
import path from 'path';

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
      throw new AuthorizedError('You are not allowed to delete this blog');

    if (blog.banner) {
      const imagePath = path.join(process.cwd(), 'uploads', blog.banner);

      try {
        await fs.unlink(imagePath);
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
    }

    await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
  }
}

export const deleteBlogService = new DeleteBlogService();
