import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { BadRequestError } from '@/shared/errors/badRequestError';

export function validate(schema: z.ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(', ');

      throw new BadRequestError(message);
    }

    next();
  };
}
