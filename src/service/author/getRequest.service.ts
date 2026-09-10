import { prisma } from '@/configs/database';

export class GetAuthorRequestsService {
  public async get() {
    return prisma.authorRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export const getAuthorRequestsService = new GetAuthorRequestsService();
