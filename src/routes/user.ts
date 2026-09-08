import { Router } from 'express';

import { showMeController } from '@/controllers/users/me.controller';
import { getAllController } from '@/controllers/users/getAll.controller';
import { updateController } from '@/controllers/users/update.controller';
import { updatePasswordController } from '@/controllers/users/updatePassword.controller';
import { deleteUserController } from '@/controllers/users/delete.controller';

import { authMiddleware } from '@/middlewares/auth';
import { permission } from '@/middlewares/permission';

const router = Router();

router.get('/me', authMiddleware, showMeController.showMe);

router.get(
  '/get',
  authMiddleware,
  permission(['ADMIN']),
  getAllController.getAll,
);

router.patch('/update', authMiddleware, updateController.updateUser);

router.patch(
  '/password',
  authMiddleware,
  updatePasswordController.updatePassword,
);

router.delete('/delete', authMiddleware, deleteUserController.deleteUser);

export default router;
