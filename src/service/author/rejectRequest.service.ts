import { prisma } from '@/configs/database';
import { ConflictError } from '@/shared/errors/conflictError';
import { NotFoundError } from '@/shared/errors/notFoundError';

export class RejectAuthorRequestService {
  public async execute(requestId: string) {
    const request = await prisma.authorRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) throw new NotFoundError('author request not found');

    if (request.status !== 'PENDING')
      throw new ConflictError('this request has already been processed');

    return prisma.authorRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'REJECTED',
      },
    });
  }
}

export const rejectAuthorRequestService = new RejectAuthorRequestService();
