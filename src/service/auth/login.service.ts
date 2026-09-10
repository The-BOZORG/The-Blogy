import argon2 from 'argon2';

import { prisma } from '@/configs/database';

import { BadRequestError } from '@/shared/errors/badRequestError';

import { SessionService } from '@/utils/session';
import { LoginData } from '@/shared/interfaces';

export class LoginService {
  constructor(private readonly sessionService: SessionService) {}

  public async login(data: LoginData): Promise<{
    sessionId: string;
    username: string;
    email: string;
    role: string;
    isActive: string;
  }> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        status: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) throw new BadRequestError('invalid email or password');

    const hashedPassword = user.password;

    if (hashedPassword === null)
      throw new BadRequestError('invalid email or password');

    const validPassword = await argon2.verify(hashedPassword, password);

    if (!validPassword) throw new BadRequestError('invalid email or password');

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        status: 'VERIFIED',
      },
    });

    const sessionId = await this.sessionService.createSession(user.id);

    return {
      sessionId,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}

export const loginService = new LoginService(new SessionService());
