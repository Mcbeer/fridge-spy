import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUserSelf,
  postUser,
  putUser,
} from '../lib/user';

const router = Router();

router.get('/me', getUserSelf);
router.get('/:id', getUserById);

router.post('/', postUser);
router.put('/', putUser);
router.delete('/:id', deleteUser);

export { router as userRouter };
