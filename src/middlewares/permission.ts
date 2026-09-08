import { NextFunction, Request, Response } from 'express';

import { AuthorizedError } from '@/shared/errors/authorizedError';
import { UserData } from '@/shared/interfaces/index';

export function permission(roles: UserData['role'][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new AuthorizedError('You have no access');
    }
    next();
  };
}
