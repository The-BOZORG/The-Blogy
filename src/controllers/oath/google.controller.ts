import { Request, Response } from 'express';
import passport from 'passport';

import { BadRequestError } from '@/shared/errors/badRequestError';
import { asyncHandler } from '@/middlewares/asyncHandler';

import { googleService } from '@/service/oauth/google.service';
import { SessionService } from '@/utils/session';
import { GoogleUserData } from '@/shared/interfaces/google.interface';

class GoogleController {
  private readonly sessionService = new SessionService();

  public google = passport.authenticate('google', {
    scope: ['profile', 'email'],
  });

  public googleCallback = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) throw new BadRequestError('google authentication failed');

      const googleUser = req.user as GoogleUserData;

      const user = await googleService.findOrCreateGoogleUser(googleUser);

      const sessionId = await this.sessionService.createSession(user.id);

      res.cookie('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      res.status(200).json({
        success: true,
        message: 'Google login successful',
      });
    },
  );
}

export const googleController = new GoogleController();
