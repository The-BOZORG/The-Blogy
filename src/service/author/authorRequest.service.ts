import { prisma } from '@/configs/database';
import { ConflictError } from '@/shared/errors/conflictError';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class AuthorRequestsService {
  public async authorRequest(userId: string, reason?: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundError('user not found');

    if (user.role === 'AUTHOR')
      throw new ConflictError('you are already author');

    if (user.isActive === 'BANNED')
      throw new ConflictError(
        'banned users cannot request to become an author',
      );

    const pendingRequest = await prisma.authorRequest.findFirst({
      where: {
        userId,
        status: 'PENDING',
      },
    });

    if (pendingRequest)
      throw new ConflictError('you already have a pending author request');

    return prisma.authorRequest.create({
      data: {
        userId,
        reason,
      },
    });
  }
}
export const authorRequestsService = new AuthorRequestsService();
