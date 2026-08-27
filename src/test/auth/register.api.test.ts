import request from 'supertest';

import Server from '../../../index';

describe('POST /api/v1/auth/register', () => {
  const server = new Server();

  server.start();

  const app = server.getApplication();

  it('should register user successfully', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .set('Origin', 'http://Blogy.project.com')
      .send({
        username: 'testuser',
        email: `test-${Date.now()}@example.com`,
        password: '123456',
      });

    expect(response.status).toBe(201);
  });
});
