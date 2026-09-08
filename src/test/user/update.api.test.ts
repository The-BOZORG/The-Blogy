import request from 'supertest';

import { prisma } from '@/configs/database';

import Server from '../../../index';

describe('PATCH /api/v1/users/:id', () => {
  const server = new Server();

  server.start();

  const app = server.getApplication();

  let userId: string;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        username: 'update-test',
        email: 'update-test@gmail.com',
        password: '123456',
        role: 'USER',
      },
    });

    userId = user.id;
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  });

  it('should update user successfully', async () => {
    const response = await request(app).patch(`/api/v1/users/${userId}`).send({
      username: 'ali',
      email: 'ali@gmail.com',
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    expect(updatedUser).toEqual(
      expect.objectContaining({
        username: 'ali',
        email: 'ali@gmail.com',
      }),
    );
  });
});
