import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUserSelf,
  postUser,
  putUser,
} from '../lib/user';

export const userRouter = (): Router => {
  const userRouter = Router();

  userRouter.get('/me', getUserSelf);
  userRouter.get('/:id', getUserById);

  userRouter.post('/', postUser);
  userRouter.put('/', putUser);
  userRouter.delete('/:id', deleteUser);

  return userRouter;
};
