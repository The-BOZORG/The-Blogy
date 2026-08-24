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
};
