import { prisma } from '@/configs/database';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { BlogData } from '@/shared/interfaces/index';
import { genSlug } from '@/utils/slug';

export class CreateBlogService {
  public async createBlog(userId: string, body: BlogData): Promise<BlogData> {
    const { title, content, banner, status } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundError('User not found');

    const slug = genSlug(title);

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
