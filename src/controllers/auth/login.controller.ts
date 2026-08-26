import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';
import { ApiResponse } from '@/shared/apiResponse';
import { loginService } from '@/service/auth/login.service';

export class LoginController {
  public login = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const sessionId = await loginService.login(req.body);

      res.cookie('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      res.status(200).json(ApiResponse(200, null, 'user login successfully'));
    },
  );
}
