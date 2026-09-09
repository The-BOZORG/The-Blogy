import { Router } from 'express';

import { createBlogController } from '@/controllers/blog/create.controller';

import { authMiddleware } from '@/middlewares/auth';
import { permission } from '@/middlewares/permission';
import { validate } from '@/middlewares/validate';

import { createBlogSchema } from '@/schemas/blogValidate.schema';

import { globalLimiter } from '@/middlewares/limiter';

const router = Router();

router.post(
  '/create',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  validate(createBlogSchema),
  createBlogController.createBlog,
);

export default router;
