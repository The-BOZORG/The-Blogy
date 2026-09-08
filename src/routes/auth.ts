import { Router } from 'express';

import { registerController } from '@/controllers/auth/register.controller';
import { loginController } from '@/controllers/auth/login.controller';
import { logoutController } from '@/controllers/auth/logout.controller';

import { validate } from '@/middlewares/validate';
import { registerSchema, loginSchema } from '@/schemas/authValidate.schema';
import { authMiddleware } from '@/middlewares/auth';
import { authLimiter } from '@/middlewares/limiter';

const router = Router();

router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  registerController.register,
);
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  loginController.login,
);
router.post('/logout', authMiddleware, logoutController.logout);

export default router;
