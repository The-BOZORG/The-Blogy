import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { showMeService } from '@/service/users/me.service';

export class ShowMeController {
  public showMe = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await showMeService.showMe(req.user.id);

      res.status(200).json(ApiResponse(200, user));
    },
  );
}

export const showMeController: ShowMeController = new ShowMeController();
