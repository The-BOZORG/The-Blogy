import 'dotenv/config';
import { z } from 'zod';

export const config = {
  PORT: z.coerce.number().default(3000).parse(process.env.PORT),

  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development')
    .parse(process.env.NODE_ENV),

  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .parse(process.env.DATABASE_URL),

  WHITELIST_ADMIN: z
    .string()
    .transform((value) => value.split(',').map((email) => email.trim()))
    .pipe(z.array(z.email()))
    .parse(process.env.WHITELIST_ADMIN),

  CORS_WHITELIST: z
    .string()
    .min(1, 'CORS_WHITELIST is required')
    .parse(process.env.CORS_WHITELIST),

  REDIS_URL: z
    .string()
    .min(1, 'REDIS_URL is required')
    .parse(process.env.REDIS_URL),

  GOOGLE_CLIENT_ID: z
    .string()
    .min(1, 'GOOGLE_CLIENT_ID is required')
    .parse(process.env.GOOGLE_CLIENT_ID),

  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, 'GOOGLE_CLIENT_SECRET is required')
    .parse(process.env.GOOGLE_CLIENT_SECRET),

  GOOGLE_CALLBACK_URL: z
    .string()
    .min(1, 'GOOGLE_CALLBACK_URL is required')
    .parse(process.env.GOOGLE_CALLBACK_URL),
};
