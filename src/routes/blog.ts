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
import { upload } from '@/middlewares/upload';

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
  upload.single('banner'),
  validate(createBlogSchema),
  createBlogController.createBlog,
);

router.patch(
  '/update/:blogId',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  upload.single('banner'),
  validate(updateBlogSchema),
  updateBlogController.updateBlog,
);

router.delete(
  '/delete/:blogId',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN', 'AUTHOR']),
  deleteBlogController.deleteBlog,
);

export default router;
