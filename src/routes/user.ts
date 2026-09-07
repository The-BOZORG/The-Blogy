import { Router } from 'express';

import { showMeController } from '@/controllers/users/me.controller';
import { getAllController } from '@/controllers/users/getAll.controller';

import { authMiddleware } from '@/middlewares/auth';

const router = Router();

router.get('/me', authMiddleware, showMeController.showMe);
router.get('/get', authMiddleware, getAllController.getAll);

export default router;
