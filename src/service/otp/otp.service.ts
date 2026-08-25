import crypto from 'node:crypto';

import { redisClient } from '@/configs/redis';

import { BadRequestError } from '@/shared/errors/badRequestError';
import { IOtpData } from '@/shared/interfaces/opt.interface';

export class OtpService {
  private readonly otpExpiration = 300;
  private readonly maxAttempts = 5;

  public async generateOtp(data: IOtpData): Promise<string> {
    const code = crypto.randomInt(100000, 1000000).toString();

    const key = `otp:${data.email}`;

    await redisClient.hSet(key, {
      code,
      attempts: '0',
      email: data.email,
    });

    await redisClient.expire(key, this.otpExpiration);

    return code;
  }

  public async verifyOtp(email: string, code: string): Promise<void> {
    const key = `otp:${email}`;

    const otpData = await redisClient.hGetAll(key);

    if (!otpData.code) {
      throw new BadRequestError('OTP is invalid or expired');
    }

    const attempts = Number(otpData.attempts);

    if (attempts >= this.maxAttempts) {
      await redisClient.del(key);

      throw new BadRequestError('maximum OTP attempts exceeded');
    }

    if (otpData.code !== code) {
      await redisClient.hIncrBy(key, 'attempts', 1);

      throw new BadRequestError('invalid OTP');
    }

    await redisClient.del(key);
  }
}
