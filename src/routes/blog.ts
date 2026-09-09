import { Router } from 'express';

import { createBlogController } from '@/controllers/blog/create.controller';
import { updateBlogController } from '@/controllers/blog/update.controller';
import { myBlogController } from '@/controllers/blog/me.controller';
import { deleteBlogController } from '@/controllers/blog/delete.controller';
import { getAllBlogController } from '@/controllers/blog/getAll.controller';

import { authMiddleware } from '@/middlewares/auth';
import { permission } from '@/middlewares/permission';
import { validate } from '@/middlewares/validate';

import {
  createBlogSchema,
  updateBlogSchema,
} from '@/schemas/blogValidate.schema';

import { globalLimiter } from '@/middlewares/limiter';

const router = Router();

router.get(
  '/me',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  myBlogController.myBlog,
);

router.get(
  '/get',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN']),
  getAllBlogController.getAll,
);

router.post(
  '/create',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  validate(createBlogSchema),
  createBlogController.createBlog,
);

router.delete(
  '/delete',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  deleteBlogController.deleteUser,
);

router.patch(
  '/update/:blogId',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  validate(updateBlogSchema),
  updateBlogController.updateBlog,
);

export default router;
