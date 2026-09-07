import { Router } from 'express';

import { showMeController } from '@/controllers/users/me.controller';

import { authMiddleware } from '@/middlewares/auth';

const router = Router();

router.get('/me', authMiddleware, showMeController.showMe);

export default router;
