import argon2 from 'argon2';
import request from 'supertest';

import { prisma } from '@/configs/database';
import { connectRedis, disconnectRedis } from '@/configs/redis';

import Server from '../../../index';

describe('POST /api/v1/auth/login', () => {
  const server = new Server();

  server.start();

  const app = server.getApplication();

  beforeAll(async () => {
    await connectRedis();

    const password = await argon2.hash('123456');

    await prisma.user.upsert({
      where: {
        email: 'login-test@gmail.com',
      },
      update: {
        password,
      },
      create: {
        username: 'login-test',
        email: 'login-test@gmail.com',
        password,
        role: 'USER',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: 'login-test@gmail.com',
      },
    });

    await disconnectRedis();
  });

  it('should login user successfully', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Origin', 'http://Blogy.project.com')
      .send({
        email: 'login-test@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'user login successfully',
      }),
    );

    expect(response.headers['set-cookie']).toBeDefined();
  });
});
