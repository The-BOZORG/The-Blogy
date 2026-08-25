import { Router } from 'express';

import { registerController } from '@/controllers/auth/register.controller';

import { validate } from '@/middlewares/validate';
import { registerSchema, loginSchema } from '@/schemas/authValidate.schema';

const router = Router();

router.post('/register', validate(registerSchema), registerController.register);

export default router;
