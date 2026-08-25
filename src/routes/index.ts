import { Router } from 'express';

import { ApiResponse } from '@/shared/apiResponse';
import authRoute from '@/routes/auth';

const router = Router();

//router
router.use('/auth', authRoute);

//root
router.get('/', (req, res) => {
  res.status(200).json(ApiResponse(200, null, 'Welcome to Blog API 👋'));
});

router.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

export default router;
