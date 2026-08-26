import crypto from 'node:crypto';

import { redisClient } from '@/configs/redis';

export class SessionService {
  private readonly sessionExpiration = 60 * 60 * 24 * 7; // 7 days

  public async createSession(userId: string): Promise<string> {
    const sessionId = crypto.randomBytes(32).toString('hex');

    const sessionKey = `session:${sessionId}`;
    const userSessionsKey = `user_sessions:${userId}`;

    const now = new Date().toISOString();
    const expiresAt = new Date(
      Date.now() + this.sessionExpiration * 1000,
    ).toISOString();

    await redisClient.hSet(sessionKey, {
      userId,
    });

    await redisClient.expire(sessionKey, this.sessionExpiration);

    await redisClient.sAdd(userSessionsKey, sessionId);

    return sessionId;
  }

  public async deleteSession(sessionId: string): Promise<void> {
    await redisClient.del(`session:${sessionId}`);
  }
}

export const sessionService = new SessionService();
