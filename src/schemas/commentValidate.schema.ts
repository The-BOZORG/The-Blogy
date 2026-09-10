import z from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(10, 'content must be at least 10 characters'),
});

export type CreateInput = z.infer<typeof createCommentSchema>;
