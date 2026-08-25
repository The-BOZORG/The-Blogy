import { prisma } from '@/configs/database';

import { IUser } from '@/shared/interfaces/IUser.interface';
import { ConflictError } from '@/shared/errors/conflictError';
import { BadRequestError } from '@/shared/errors/badRequestError';

import { OtpService } from '@/otp/otp.service';

import argon2 from 'argon2';

type UserData = Pick<IUser, 'email' | 'password' | 'username' | 'phone'>;

type UserResponse = Omit<IUser, 'password'>;

class RegisterService {
  constructor(private readonly otpService: OtpService) {}

  public async register(data: UserData): Promise<UserResponse> {
    const { username, email, password, phone } = data;

    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

    if (existUser) {
      if (existUser.email === email) {
        throw new ConflictError('email already exists');
      }

      if (existUser.phone === phone) {
        throw new ConflictError('phone already exists');
      }
    }

    if (!password) throw new BadRequestError('password is required');

    const hashedPassword = await argon2.hash(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    await this.otpService.generateOtp({
      phone,
    });

    return newUser;
  }
}

export const registerService = new RegisterService(new OtpService());
