import { Prisma } from '@generated/prisma/client';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

import { logger } from '@/utils/logger';
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
  logger.error(err);

  // Prisma Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      err = new BadRequestError('value already exists');
    } else if (err.code === 'P2025') {
      err = new NotFoundError('resource not found');
    }
  }

  // Session Error
  if (err instanceof Error && err.name === 'SessionError') {
    err = new AuthenticatedError('invalid or expired session');
  }

  // Redis Error
  if (err instanceof Error && err.name === 'RedisError') {
    err = new ServiceUnavailableError('service temporarily unavailable');
  }

  // Multer Errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      err = new BadRequestError('file size must not exceed 2MB');
    }
  }

  // Known ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.serializeError());
  }

  // Unknown
  const internalError = new InternalServerError('Internal server error');

  return res
    .status(internalError.statusCode)
    .json(internalError.serializeError());
}
