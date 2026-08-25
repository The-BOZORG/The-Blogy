import crypto from 'node:crypto';

import { redisClient } from '@/configs/redis';

import { IOtpData } from '@/shared/interfaces/opt.interface';

export class OtpService {
  private readonly otpExpiration = 300;
  private readonly maxAttempts = 5;

  public async generateOtp(data: IOtpData): Promise<string> {
    const code = crypto.randomInt(100000, 1000000).toString();

    const key = `otp:${data.phone}`;

    await redisClient.hSet(key, {
      code,
      attempts: '0',
      phone: data.phone,
    });

    await redisClient.expire(key, this.otpExpiration);

    return code;
  }
}
