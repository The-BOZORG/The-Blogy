import z from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'username must be at least 3 characters')
    .max(30, 'username must be at most 30 characters'),
  email: z.string().trim().email('valid email required').toLowerCase(),
  password: z.string().min(4, 'password must be at least 4 characters'),
});

export const loginSchema = z.object({
  email: z.string().trim().email('valid email required').toLowerCase(),
  password: z.string().min(4, 'password must be at least 4 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
