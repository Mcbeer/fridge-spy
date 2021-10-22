import { Router } from 'express';
import { authorizeUser } from '../lib/authentication/authorizeUser';
import { validateUser } from '../lib/authentication/validateUser';

const router = Router();
router.post('/validate', validateUser);
router.post('/authorize', authorizeUser);

export { router as authRouter };
