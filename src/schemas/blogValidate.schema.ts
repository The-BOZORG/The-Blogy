import z from 'zod';

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(3, 'title must be at least 3 characters')
    .max(100, 'title must be at most 100 characters'),

  content: z.string().min(10, 'content must be at least 10 characters'),

  banner: z.string().url('banner must be a valid URL').nullable().optional(),

  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export type RegisterInput = z.infer<typeof createBlogSchema>;
