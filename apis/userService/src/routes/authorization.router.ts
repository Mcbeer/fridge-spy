import { Router } from 'express';
import { authorizeUser } from '../lib/authentication/authorizeUser';
import { validateUser } from '../lib/authentication/validateUser';

export const authRouter = (): Router => {
  const authRouter = Router();

  authRouter.post('/validate', validateUser);
  authRouter.post('/authorize', authorizeUser);

  return authRouter;
};
