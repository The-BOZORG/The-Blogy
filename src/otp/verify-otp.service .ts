import { prisma } from '@/configs/database';

import { BadRequestError } from '@/shared/errors/badRequestError';

import { OtpService } from './otp.service';
import { SessionService } from '@/utils/session';

class VerifyOtpService {
  constructor(
    private readonly otpService: OtpService,
    private readonly sessionService: SessionService,
  ) {}

  public async verifyOtp(email: string, code: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!user) {
      throw new BadRequestError('user not found');
    }

    if (user.status === 'VERIFIED') {
      throw new BadRequestError('user is already verified');
    }

    await this.otpService.verifyOtp(email, code);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        status: 'VERIFIED',
      },
    });

    const sessionId = await this.sessionService.createSession(user.id);

    return sessionId;
  }
}

export const verifyOtpService = new VerifyOtpService(
  new OtpService(),
  new SessionService(),
);
