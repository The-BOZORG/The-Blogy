import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { banUserService } from '@/service/users/ban.service';

export class BanUserController {
  public banUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    await banUserService.banUser(userId);

    res.status(200).json(ApiResponse(200, null, 'user banned successfully'));
  });
}

export const banUserController = new BanUserController();
