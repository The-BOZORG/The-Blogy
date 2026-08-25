import { UserResponse } from '@/shared/types/user.types';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
    }
  }
}

export {};
