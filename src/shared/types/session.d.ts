import { UserResponse } from '@/shared/types/user.types';
import { Blog } from '@generated/prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: UserResponse;
      blog: Blog;
    }
  }
}

export {};
