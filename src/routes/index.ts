import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from '@/configs/swagger';

import { ApiResponse } from '@/shared/apiResponse';
import authRoute from '@/routes/auth';
import userRoute from '@/routes/user';
import blogRoute from '@/routes/blog';
import commentRouter from '@/routes/comment';
import authorRouter from '@/routes/author';

const router = Router();

//swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//routes
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/blog', blogRoute);
router.use('/comment', commentRouter);
router.use('/author', authorRouter);

//root
router.get('/', (req, res) => {
  res.status(200).json(ApiResponse(200, null, 'Welcome to Blog API 👋'));
});

router.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

export default router;
