import { prisma } from '@/configs/database';
import { AuthorizedError } from '@/shared/errors/authorizedError';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class DeleteCommentService {
  public async deleteComment(
    userId: string,
    commentId: string,
    role: string,
  ): Promise<void> {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new NotFoundError('comment not found');

    if (role !== 'ADMIN' && comment.userId !== userId)
      throw new AuthorizedError('You are not allowed to delete this blog');

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}

export const deleteCommentService = new DeleteCommentService();
