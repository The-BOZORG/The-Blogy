import { Router } from 'express';
import passport from 'passport';

import { registerController } from '@/controllers/auth/register.controller';
import { loginController } from '@/controllers/auth/login.controller';
import { logoutController } from '@/controllers/auth/logout.controller';
import { googleController } from '@/controllers/oath/google.controller';

import { validate } from '@/middlewares/validate';
import { registerSchema, loginSchema } from '@/schemas/authValidate.schema';
import { authMiddleware } from '@/middlewares/auth';

const router = Router();

router.post('/register', validate(registerSchema), registerController.register);
router.post('/login', validate(loginSchema), loginController.login);
router.post('/logout', authMiddleware, logoutController.logout);

//google OAth
router.get('/google', googleController.google);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/login',
  }),
  googleController.googleCallback,
);

export default router;
