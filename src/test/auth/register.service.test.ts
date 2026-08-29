import argon2 from 'argon2';

import { prisma } from '@/configs/database';
import { registerService } from '@/service/auth/register.service';

jest.mock('argon2');

jest.mock('@/configs/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('RegisterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // first test
  it('should register user successfully', async () => {
    const data = {
      username: 'soroush',
      email: 'soroush@gmail.com',
      password: '123456',
    };

    const hashedPassword = 'hashed-password';

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    (argon2.hash as jest.Mock).mockResolvedValue(hashedPassword);

    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 'user-id',
      username: data.username,
      email: data.email,
      role: 'USER',
    });

    const result = await registerService.register(data);

    expect(result).toEqual({
      id: 'user-id',
      username: data.username,
      email: data.email,
      role: 'USER',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    expect(argon2.hash).toHaveBeenCalledWith(data.password);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: 'USER',
      },
      omit: {
        password: true,
      },
    });
  });

  // conflict email
  it('should throw ConflictError if email already exists', async () => {
    const data = {
      username: 'soroush',
      email: 'soroush@gmail.com',
      password: '123456',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'user-id',
      email: data.email,
    });

    await expect(registerService.register(data)).rejects.toThrow(
      'email already exists',
    );

    expect(argon2.hash).not.toHaveBeenCalled();

    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  //null password
  it('should throw BadRequestError if password is missing', async () => {
    const data = {
      username: 'soroush',
      email: 'soroush@gmail.com',
      password: '',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(registerService.register(data)).rejects.toThrow(
      'password is required',
    );

    expect(argon2.hash).not.toHaveBeenCalled();

    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  //whitelist admin email
  it('should register user as admin if email is whitelisted', async () => {
    const data = {
      username: 'soroush',
      email: 'soroush@yahoo.com',
      password: '123456',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    (argon2.hash as jest.Mock).mockResolvedValue('hashed-password');

    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 'admin-id',
      username: data.username,
      email: data.email,
      role: 'ADMIN',
    });

    const result = await registerService.register(data);

    expect(result.role).toBe('ADMIN');

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: data.username,
        email: data.email,
        password: 'hashed-password',
        role: 'ADMIN',
      },
      omit: {
        password: true,
      },
    });
  });
});
