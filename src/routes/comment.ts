import { Router } from 'express';

import { createCommentController } from '@/controllers/comment/create.controller';
import { deleteCommentController } from '@/controllers/comment/delete.controller';
import { getAllCommentController } from '@/controllers/comment/getAll.controller';

import { authMiddleware } from '@/middlewares/auth';
import { permission } from '@/middlewares/permission';
import { validate } from '@/middlewares/validate';

import { globalLimiter } from '@/middlewares/limiter';

import { createCommentSchema } from '@/schemas/commentValidate.schema';

const router = Router();

router.get(
  '/get',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  getAllCommentController.getAll,
);

router.post(
  '/create/:blogId',
  globalLimiter,
  authMiddleware,
  validate(createCommentSchema),
  createCommentController.createComment,
);

router.delete(
  '/delete/:commentId',
  globalLimiter,
  authMiddleware,
  deleteCommentController.deleteComment,
);

export default router;
