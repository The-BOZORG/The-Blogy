import { prisma } from '@/configs/database';
import { BlogData } from '@/shared/interfaces';

export class MyBlogService {
  public async myBlog(userId: string): Promise<BlogData[]> {
    const blog = await prisma.blog.findMany({
      where: {
        authorId: userId,
      },
    });
    return blog;
  }
}

export const myBlogService = new MyBlogService();
