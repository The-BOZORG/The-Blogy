import { Request, Response } from 'express';
import { asyncHandler } from '@/middlewares/asyncHandler';
import { registerService } from '@/service/auth/register.service';
import { ApiResponse } from '@/shared/apiResponse';

export class RegisterController {
  public register = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await registerService.register(req.body);

      res
        .status(201)
        .json(ApiResponse(201, user, 'user register successfully'));
    },
  );
}

export const registerController: RegisterController = new RegisterController();
