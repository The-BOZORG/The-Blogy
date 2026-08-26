import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';

import { logoutService } from '@/service/auth/logout.service';

export class LogoutController {
  public logout = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const sessionId = req.cookies.session_id;

      await logoutService.logout(sessionId);

      res.clearCookie('session_id', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      res.status(200).json({
        success: true,
        message: 'logout successful',
      });
    },
  );
}

export const logoutController = new LogoutController();
