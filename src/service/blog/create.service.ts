import argon2 from 'argon2';

import { prisma } from '@/configs/database';
import { BadRequestError } from '@/shared/errors/badRequestError';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { UpdatePasswordData } from '@/shared/interfaces';
import { AuthenticatedError } from '@/shared/errors/authenticatedError';

export class CreateBlogService {
  public async createBlog(
    userId: string,
    body: UpdatePasswordData,
  ): Promise<void> {}
}

export const createBlogService = new CreateBlogService();
