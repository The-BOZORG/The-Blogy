import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { showMeServices } from '@/service/users/me.service';

export class ShowMeController {
  public showMe = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await showMeServices.showMe(req.cookies.session_id);

      res.status(200).json(ApiResponse(200, user));
    },
  );
}

export const showMeController: ShowMeController = new ShowMeController();
