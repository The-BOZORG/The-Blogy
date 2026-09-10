import { Router } from 'express';

import { authorRequestsController } from '@/controllers/author/authorRequest.controller';
import { approveRequestController } from '@/controllers/author/approveRequest.controller';
import { rejectAuthorRequestController } from '@/controllers/author/rejectRequest.controller';
import { getAuthorRequestsController } from '@/controllers/author/getRequets.controller';

import { authMiddleware } from '@/middlewares/auth';
import { authLimiter } from '@/middlewares/limiter';
import { permission } from '@/middlewares/permission';

const router = Router();

router.post(
  '/request',
  authLimiter,
  authMiddleware,
  authorRequestsController.createRequest,
);

router.get(
  '/get',
  authMiddleware,
  permission(['ADMIN']),
  getAuthorRequestsController.get,
);

router.post(
  '/approve/:requestId',
  authMiddleware,
  permission(['ADMIN']),
  approveRequestController.handle,
);

router.post(
  '/reject/:requestId',
  authMiddleware,
  permission(['ADMIN']),
  rejectAuthorRequestController.handle,
);

export default router;
