import { rateLimit } from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,

  message: {
    error: 'too many requests. please try again later.',
  },
});

export const globalLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,

  message: {
    error: 'too many requests. please try again later.',
  },
});
