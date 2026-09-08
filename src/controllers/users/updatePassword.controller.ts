import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { updatePasswordService } from '@/service/users/updatePassword.service';

export class UpdatePasswordController {
  public updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const user = await updatePasswordService.updatePassword(
      req.user.id,
      req.body,
    );

    res.status(200).json(ApiResponse(200, null, 'update password success'));
  });
}

export const updatePasswordController = new UpdatePasswordController();
