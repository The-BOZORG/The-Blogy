import { Request, Response, NextFunction } from 'express';

import { prisma } from '@/configs/database';
import { redisClient } from '@/configs/redis';

import { AuthenticatedError } from '@/shared/errors/authenticatedError';
import { asyncHandler } from './asyncHandler';

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const sessionId = req.cookies.session_id;

    if (!sessionId) throw new AuthenticatedError('Authentication required');

    const sessionKey = `session:${sessionId}`;

    const session = await redisClient.hGetAll(sessionKey);

    if (!session.userId)
      throw new AuthenticatedError('invalid or expired session');

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) throw new AuthenticatedError('user not found');

    if (user.status !== 'VERIFIED')
      throw new AuthenticatedError('user is not verified');

    if (user.isActive !== 'ACTIVE')
      throw new AuthenticatedError('user account is not active');

    req.user = user;

    next();
  },
);
