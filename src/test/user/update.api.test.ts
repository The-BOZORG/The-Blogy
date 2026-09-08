import argon2 from 'argon2';
import request from 'supertest';

import { prisma } from '@/configs/database';
import { connectRedis, disconnectRedis } from '@/configs/redis';

import Server from '../../../index';

describe('PATCH /api/v1/user/update', () => {
  const server = new Server();

  server.start();

  const app = server.getApplication();

  const testUser = {
    username: 'update-test',
    email: 'update-test@gmail.com',
    password: '123456',
  };

  const updatedUser = {
    username: 'update-test-updated',
    email: 'update-test-new-12345@gmail.com',
  };

  beforeAll(async () => {
    await connectRedis();

    const password = await argon2.hash(testUser.password);

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testUser.email, updatedUser.email],
        },
      },
    });

    await prisma.user.create({
      data: {
        username: testUser.username,
        email: testUser.email,
        password,
        role: 'USER',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testUser.email, updatedUser.email],
        },
      },
    });

    await disconnectRedis();
  });

  it('should update user successfully', async () => {
    // 1. Login
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .set('Origin', 'http://Blogy.project.com')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(loginResponse.status).toBe(200);

    // 2. Get authentication cookie
    const cookies = loginResponse.headers['set-cookie'];

    expect(cookies).toBeDefined();

    // 3. Update user
    const response = await request(app)
      .patch('/api/v1/user/update')
      .set('Origin', 'http://Blogy.project.com')
      .set('Cookie', cookies)
      .send({
        username: updatedUser.username,
        email: updatedUser.email,
      });

    // 4. Check response
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'update user success',
      }),
    );

    // 5. Check database
    const user = await prisma.user.findUnique({
      where: {
        email: updatedUser.email,
      },
    });

    expect(user).not.toBeNull();

    expect(user).toEqual(
      expect.objectContaining({
        username: updatedUser.username,
        email: updatedUser.email,
      }),
    );
  });
});
