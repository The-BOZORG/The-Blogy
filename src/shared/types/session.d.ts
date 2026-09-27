import { Blog } from '@generated/prisma/client';
import { AuthUser } from '../interfaces';

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
      blog: Blog;
    }
  }
}

export {};
