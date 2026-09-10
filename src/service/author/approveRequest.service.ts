import { prisma } from '@/configs/database';
import { ConflictError } from '@/shared/errors/conflictError';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class ApproveAuthorRequestService {
  public async execute(requestId: string) {
    const request = await prisma.authorRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) throw new NotFoundError('author request not found');

    if (request.status !== 'PENDING')
      throw new ConflictError('this request has already been processed');

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: {
          id: request.userId,
        },
        data: {
          role: 'AUTHOR',
        },
      });

      const authorRequest = await tx.authorRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: 'APPROVED',
        },
      });

      return {
        user,
        authorRequest,
      };
    });
  }
}

export const approveAuthorRequestService = new ApproveAuthorRequestService();
