import { authMiddleware } from '@fridgespy/express-helpers';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, json, Router, urlencoded } from 'express';
import { authRouter } from '../routes/authorization.router';
import { userRouter } from '../routes/user.router';

export const setupExpressApp = (): Express => {
  const app = express();
  const apiVersion = 'v' + (process.env.API_VERSION || 1);
  const basePath = `/api/${apiVersion}`;
  const baseRouter = Router();

  console.log(basePath);

  // Base routes declaration
  const userBasePath = '/user';
  const authBasePath = '/auth';

  // We setup middlewares here...
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(basePath, baseRouter);

  // Setup the sub routes
  baseRouter.use(authBasePath, authRouter);
  baseRouter.use(userBasePath, authMiddleware, userRouter);

  return app;
};
