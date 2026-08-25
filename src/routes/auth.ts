import { Router } from 'express';

import { registerController } from '@/controllers/auth/register.controller';

import { validate } from '@/middlewares/validate';
import {
  registerSchema,
  verifyOtpSchema,
  loginSchema,
} from '@/schemas/authValidate.schema';
import { verifyOtpController } from '@/controllers/otp/verify-otp.controller';

const router = Router();

router.post('/register', validate(registerSchema), registerController.register);

router.post(
  '/verify-otp',
  validate(verifyOtpSchema),
  verifyOtpController.verifyOtp,
);

export default router;
