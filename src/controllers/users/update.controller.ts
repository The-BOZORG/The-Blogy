import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { updateUserService } from '@/service/users/update.service';

export class UpdateController {
  public updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await updateUserService.updateUser(req.user.id, req.body);

    res.status(200).json(ApiResponse(200, user, 'update user success'));
  });
}

export const updateController = new UpdateController();
