import argon2 from 'argon2';

import { prisma } from '@/configs/database';

import { BadRequestError } from '@/shared/errors/badRequestError';
import { ConflictError } from '@/shared/errors/conflictError';
import { UserData } from '@/shared/interfaces';
import { UserResponse } from '@/shared/types';
import { config } from '@/configs';

class RegisterService {
  public async register(data: UserData): Promise<UserResponse> {
    const { username, email, password } = data;

    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (existUser) throw new ConflictError('email already exists');

    if (!password) throw new BadRequestError('password is required');

    const hashedPassword = await argon2.hash(password);

    const role = config.WHITELIST_ADMIN.includes(email.toLowerCase())
      ? 'ADMIN'
      : 'USER';

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
      omit: {
        password: true,
      },
    });

    return newUser;
  }
}

export const registerService = new RegisterService();
