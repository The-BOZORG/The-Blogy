import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { muteUserService } from '@/service/users/mute.service';

export class MuteUserController {
  public muteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    await muteUserService.muteUser(userId);

    res.status(200).json(ApiResponse(200, null, 'user banned successfully'));
  });
}

export const muteUserController = new MuteUserController();
