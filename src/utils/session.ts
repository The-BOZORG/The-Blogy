import crypto from 'node:crypto';

import { redisClient } from '@/configs/redis';

export class SessionService {
  private readonly sessionExpiration = 60 * 60 * 24 * 7; // 7 days

  public async createSession(userId: string): Promise<string> {
    const sessionId = crypto.randomBytes(32).toString('hex');

    const sessionKey = `session:${sessionId}`;
    const userSessionsKey = `user_sessions:${userId}`;

    await redisClient.hSet(sessionKey, {
      userId,
    });

    await redisClient.expire(sessionKey, this.sessionExpiration);

    await redisClient.sAdd(userSessionsKey, sessionId);

    return sessionId;
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const sessionKey = `session:${sessionId}`;

    const session = await redisClient.hGet(sessionKey, 'userId');

    if (!session) {
      return;
    }

    const userSessionsKey = `user_sessions:${session}`;

    await redisClient.del(sessionKey);

    await redisClient.sRem(userSessionsKey, sessionId);
  }
}

export const sessionService = new SessionService();
