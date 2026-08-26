import { BadRequestError } from '@/shared/errors/badRequestError';

import { SessionService } from '@/utils/session';

export class LogoutService {
  constructor(private readonly sessionService: SessionService) {}

  public async logout(sessionId: string): Promise<void> {
    if (!sessionId) throw new BadRequestError('session not found');

    await this.sessionService.deleteSession(sessionId);
  }
}

export const logoutService = new LogoutService(new SessionService());
