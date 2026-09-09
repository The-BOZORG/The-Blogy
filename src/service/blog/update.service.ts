import { prisma } from '@/configs/database';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { BlogData } from '@/shared/interfaces';
import { genSlug } from '@/utils/slug';
import { AuthorizedError } from '@/shared/errors/authorizedError';

export class UpdateBlogService {
  public async blogUpdate(
    userId: string,
    blogId: string,
    body: BlogData,
    role: string,
    file?: Express.Multer.File,
  ): Promise<BlogData> {
    const { title, content, status } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundError('user not found');

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) throw new NotFoundError('blog not found');

    if (role !== 'ADMIN' && blog.authorId !== userId)
      throw new AuthorizedError('You are not allowed to delete this blog');

    const slug = genSlug(title);

    const banner = file?.filename ?? null;

    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },

      data: {
        title,
        slug,
        content,
        banner,
        status,
      },
    });

    return updatedBlog;
  }
}

export const updateBlogService = new UpdateBlogService();
