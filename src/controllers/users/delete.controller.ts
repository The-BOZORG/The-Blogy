import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { deleteUserService } from '@/service/users/delete.service';
import { ApiResponse } from '@/shared/apiResponse';

export class DeleteUserController {
  public deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await deleteUserService.deleteUser(req.user.id);

    res.status(200).json(ApiResponse(200, null, 'user deleted successfully'));
  });
}

export const deleteUserController = new DeleteUserController();
