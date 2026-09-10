import { Router } from 'express';

import { createCommentController } from '@/controllers/comment/create.controller';
import { deleteCommentController } from '@/controllers/comment/delete.controller';

import { authMiddleware } from '@/middlewares/auth';
import { permission } from '@/middlewares/permission';
import { validate } from '@/middlewares/validate';

import { globalLimiter } from '@/middlewares/limiter';

const router = Router();

router.post(
  '/create',
  globalLimiter,
  authMiddleware,
  createCommentController.createComment,
);

router.delete(
  '/delete/:commentId',
  globalLimiter,
  authMiddleware,
  deleteCommentController.deleteComment,
);

export default router;
