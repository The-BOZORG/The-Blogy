import argon2 from 'argon2';

import { prisma } from '@/configs/database';
import { LoginService } from '@/service/auth/login.service';
import { SessionService } from '@/utils/session';

jest.mock('argon2');

jest.mock('@/configs/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('LoginService', () => {
  const sessionService = {
    createSession: jest.fn(),
  } as unknown as SessionService;

  const loginService = new LoginService(sessionService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login user successfully', async () => {
    const data = {
      email: 'soroush@gmail.com',
      password: '123456',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-id',
      password: 'hashed-password',
    });

    (argon2.verify as jest.Mock).mockResolvedValue(true);

    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: 'user-id',
    });

    (sessionService.createSession as jest.Mock).mockResolvedValue('session-id');

    const result = await loginService.login(data);

    expect(result).toBe('session-id');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        password: true,
        status: true,
      },
    });

    expect(argon2.verify).toHaveBeenCalledWith(
      'hashed-password',
      data.password,
    );

    expect(prisma.user.update).toHaveBeenCalled();

    expect(sessionService.createSession).toHaveBeenCalledWith('user-id');
  });
});
