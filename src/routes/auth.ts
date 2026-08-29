import { Router } from 'express';

import { registerController } from '@/controllers/auth/register.controller';
import { loginController } from '@/controllers/auth/login.controller';
import { logoutController } from '@/controllers/auth/logout.controller';

import { validate } from '@/middlewares/validate';
import { registerSchema, loginSchema } from '@/schemas/authValidate.schema';
import { authMiddleware } from '@/middlewares/auth';

const router = Router();

router.post('/register', validate(registerSchema), registerController.register);
router.post('/login', validate(loginSchema), loginController.login);
router.post('/logout', authMiddleware, logoutController.logout);

export default router;
