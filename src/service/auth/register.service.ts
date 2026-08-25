import argon2 from 'argon2';

import { prisma } from '@/configs/database';

import { BadRequestError } from '@/shared/errors/badRequestError';
import { ConflictError } from '@/shared/errors/conflictError';
import { IUser } from '@/shared/interfaces/IUser.interface';
import { UserResponse } from '@/shared/types/userResponse.type';

import { OtpService } from '@/otp/otp.service';

type UserData = Pick<IUser, 'email' | 'password' | 'username'>;

class RegisterService {
  constructor(private readonly otpService: OtpService) {}

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

    await this.otpService.generateOtp({
      email,
    });

    return newUser;
  }
}

export const registerService = new RegisterService(new OtpService());
