import { Router } from 'express';

import { showMeController } from '@/controllers/users/me.controller';
import { getAllController } from '@/controllers/users/getAll.controller';
import { updateController } from '@/controllers/users/update.controller';
import { updatePasswordController } from '@/controllers/users/updatePassword.controller';
import { deleteUserController } from '@/controllers/users/delete.controller';
import { banUserController } from '@/controllers/users/ban.controller';

import { authMiddleware } from '@/middlewares/auth';
import { permission } from '@/middlewares/permission';
import { validate } from '@/middlewares/validate';

import {
  updatePasswordSchema,
  updateUserSchema,
} from '@/schemas/authValidate.schema';

import { globalLimiter } from '@/middlewares/limiter';

const router = Router();

router.get('/me', globalLimiter, authMiddleware, showMeController.showMe);

router.get(
  '/get',
  globalLimiter,
  authMiddleware,
  permission(['ADMIN']),
  getAllController.getAll,
);

router.patch(
  '/update',
  globalLimiter,
  validate(updateUserSchema),
  authMiddleware,
  updateController.updateUser,
);

router.patch(
  '/password',
  globalLimiter,
  validate(updatePasswordSchema),
  authMiddleware,
  updatePasswordController.updatePassword,
);

router.delete('/delete', authMiddleware, deleteUserController.deleteUser);

router.patch('/ban/:userId', permission(['ADMIN']), banUserController.banUser);

export default router;
