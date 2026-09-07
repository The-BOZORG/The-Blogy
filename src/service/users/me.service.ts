import { redisClient } from '@/configs/redis';

export class ShowMeServices {
  public async showMe(sessionId: string): Promise<string | null> {
    const sessionKey = `session${sessionId}`;

    const user = await redisClient.hGet(sessionKey, 'userId');

    return user;
  }
}

export const showMeServices = new ShowMeServices();
