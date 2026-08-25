import { redisClient } from '@/configs/redis';
import crypto from 'node:crypto';

export class SessionService {
  public async createSession(userId: string) {
    const sessionId = crypto.randomBytes(32).toString('hex');

    const key = `session:${sessionId}`;

    await redisClient.hSet(key, {
      userId,
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    });

    await redisClient.sAdd(`user_sessions:${userId}`, sessionId);

    return sessionId;
  }
}
