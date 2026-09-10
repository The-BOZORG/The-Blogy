import { prisma } from '@/configs/database';
import { AuthorizedError } from '@/shared/errors/authorizedError';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class CreateCommentService {
  public async createComment(userId: string, blogId: string, content: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundError('user not found');

    if (user.isActive === 'MUTE' || user.isActive === 'BANNED') {
      throw new AuthorizedError('user is not allowed to comment');
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blog) throw new NotFoundError('blog not found');

    const newComment = await prisma.comment.create({
      data: {
        content,
        blog: {
          connect: {
            id: blogId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newComment;
  }
}

export const createCommentService = new CreateCommentService();
