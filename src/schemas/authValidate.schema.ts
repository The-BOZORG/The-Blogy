import z, { email } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'name is required'),
  email: z.string().email('valid email required'),
  password: z.string().min(4, 'password is required'),
});

export const loginSchema = z.object({
  email: z.string().email('valid email required'),
  password: z.string().min(4, 'password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
