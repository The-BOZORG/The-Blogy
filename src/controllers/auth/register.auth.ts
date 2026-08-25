import { asyncHandler } from '@/middlewares/asyncHandler';
import { logger } from '@/shared/logger';
import { Request, Response } from 'express';
import { prisma } from '@/configs/database';
import { User } from '@generated/prisma/client';
import { IUser } from '@/shared/interfaces/IUser.interface';

import argon2 from 'argon2';

class RegisterService {
  public async Register(req: Request, res: Response): Promise<IUser> {
    return asyncHandler(async () => {});
  }
}
