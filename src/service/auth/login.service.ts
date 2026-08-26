import argon2 from 'argon2';

import { prisma } from '@/configs/database';

import { BadRequestError } from '@/shared/errors/badRequestError';

import { SessionService } from '@/utils/session';
import { LoginData } from '@/shared/types/loginData';

export class LoginService {
  constructor(private readonly sessionService: SessionService) {}

  public async login(data: LoginData): Promise<string> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) throw new BadRequestError('invalid email or password');

    const hashedPassword = user.password;

    if (hashedPassword === null)
      throw new BadRequestError('invalid email or password');

    const validPassword = await argon2.verify(hashedPassword, password);

    if (!validPassword) throw new BadRequestError('invalid email or password');

    return this.sessionService.createSession(user.id);
  }
}

export const loginService = new LoginService(new SessionService());
