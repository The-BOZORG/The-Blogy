import { prisma } from '@/configs/database';

import { IUser } from '@/shared/interfaces/IUser.interface';
import { ConflictError } from '@/shared/errors/conflictError';
import { BadRequestError } from '@/shared/errors/badRequestError';

import argon2 from 'argon2';

type UserData = Pick<IUser, 'email' | 'password' | 'username'>;

type UserResponse = Omit<IUser, 'password'>;

class RegisterService {
  public async register(data: UserData): Promise<UserResponse> {
    const { username, email, password } = data;

    const existUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (existUser) throw new ConflictError('email already  exist');

    if (!password) throw new BadRequestError('password is required');

    const hashedPassword = await argon2.hash(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
    return newUser;
  }
}

export const registerService: RegisterService = new RegisterService();
