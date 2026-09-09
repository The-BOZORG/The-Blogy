import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisClient } from '@/configs/redis';

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 50,

  standardHeaders: 'draft-8',
  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => {
      return redisClient.sendCommand(args);
    },
    prefix: 'rate-limit:1m:',
  }),

  message: {
    error: 'Too many requests. Please try again later.',
  },
});

export const globalLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  limit: 100,

  standardHeaders: 'draft-8',
  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => {
      return redisClient.sendCommand(args);
    },
    prefix: 'rate-limit:3m:',
  }),

  message: {
    error: 'Too many requests. Please try again later.',
  },
});
