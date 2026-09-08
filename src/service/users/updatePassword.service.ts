import argon2 from 'argon2';

import { prisma } from '@/configs/database';
import { BadRequestError } from '@/shared/errors/badRequestError';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { UpdatePasswordData } from '@/shared/interfaces';
import { AuthenticatedError } from '@/shared/errors/authenticatedError';

export class UpdatePasswordService {
  public async updatePassword(
    userId: string,
    body: UpdatePasswordData,
  ): Promise<void> {
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword)
      throw new BadRequestError(
        'please provide current password and new password',
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundError('user not found');

    const validPassword = await argon2.verify(user.password, currentPassword);

    if (!validPassword)
      throw new AuthenticatedError('current password is incorrect');

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  }
}

export const updatePasswordService = new UpdatePasswordService();
