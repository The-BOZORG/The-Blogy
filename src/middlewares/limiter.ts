import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisClient } from '@/configs/redis';

const createLimiter = (windowMs: number, limit: number, prefix: string) =>
  rateLimit({
    windowMs,
    limit,

    standardHeaders: 'draft-8',
    legacyHeaders: false,

    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
      prefix,
    }),

    message: {
      error: 'Too many requests. Please try again later.',
    },
  });

export const authLimiter = createLimiter(60 * 1000, 50, 'rate-limit:1m:');

export const globalLimiter = createLimiter(
  3 * 60 * 1000,
  100,
  'rate-limit:3m:',
);
