import { prisma } from '@/configs/database';
import { AuthorizedError } from '@/shared/errors/authorizedError';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { CreateBlogData, BlogData } from '@/shared/interfaces/index';
import { genSlug } from '@/utils/slug';

export class CreateBlogService {
  public async createBlog(
    userId: string,
    body: CreateBlogData,
    file?: Express.Multer.File,
  ): Promise<BlogData> {
    const { title, content, status } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundError('User not found');

    if (user.isActive !== 'ACTIVE')
      throw new AuthorizedError('user is not allowed to create blog');

    const slug = genSlug(title);

    const banner = file?.filename ?? null;

    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        banner,
        status,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newBlog;
  }
}

export const createBlogService = new CreateBlogService();
