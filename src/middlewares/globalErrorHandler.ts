import { Prisma } from '@generated/prisma/client';
import { Request, Response, NextFunction } from 'express';

import { logger } from '@/shared/logger';
import { ApiError } from '@/shared/errors/apiError';
import { BadRequestError } from '@/shared/errors/badRequestError';
import { NotFoundError } from '@/shared/errors/notFoundError';
import { AuthenticatedError } from '@/shared/errors/authenticatedError';
import { ServiceUnavailableError } from '@/shared/errors/serverUnavailable';
import { InternalServerError } from '@/shared/errors/InternalServerError';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({
    message: err instanceof Error ? err.message : err,
    stack: err instanceof Error ? err.stack : undefined,
  });

  // Prisma Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      err = new BadRequestError('Value already exists');
    }

    if (err.code === 'P2025') {
      err = new NotFoundError('Resource not found');
    }
  }

  // Session Error
  if (err instanceof Error && err.name === 'SessionError') {
    err = new AuthenticatedError('Invalid or expired session');
  }

  // Redis Error
  if (err instanceof Error && err.name === 'RedisError') {
    err = new ServiceUnavailableError('Service temporarily unavailable');
  }

  // OAuth Error
  if (err instanceof Error && err.name === 'OAuthError') {
    err = new AuthenticatedError('OAuth authentication failed');
  }

  // Custom Errors
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.serializeError());
  }

  // Unknown Error
  err = new InternalServerError('Internal server error');

  return res.status(err.status).json(err.serializeError());
}
