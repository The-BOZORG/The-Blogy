import { Request, Response } from 'express';

import { asyncHandler } from '@/middlewares/asyncHandler';

import { verifyOtpService } from '@/service/otp/verify-otp.service ';

class VerifyOtpController {
  public verifyOtp = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { phone, code } = req.body;

      const sessionId = await verifyOtpService.verifyOtp(phone, code);

      res.cookie('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
      });
    },
  );
}

export const verifyOtpController = new VerifyOtpController();
