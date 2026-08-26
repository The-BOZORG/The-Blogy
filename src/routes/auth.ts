import { Router } from 'express';

import { registerController } from '@/controllers/auth/register.controller';
import { loginController } from '@/controllers/auth/login.controller';

import { validate } from '@/middlewares/validate';
import { registerSchema, loginSchema } from '@/schemas/authValidate.schema';

const router = Router();

router.post('/register', validate(registerSchema), registerController.register);
router.post('/register', validate(loginSchema), loginController.login);

export default router;
