import { Router } from 'express';

import { authorRequestsController } from '@/controllers/author/authorRequest.controller';

import { authMiddleware } from '@/middlewares/auth';
import { authLimiter } from '@/middlewares/limiter';

const router = Router();

router.post(
  '/request',
  authLimiter,
  authMiddleware,
  authorRequestsController.createRequest,
);

export default router;
