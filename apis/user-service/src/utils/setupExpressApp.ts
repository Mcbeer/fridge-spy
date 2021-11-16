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

  // Base routes declaration
  const userBasePath = '/user';
  const authBasePath = '/auth';

  // TODO Implement CORS whitelist later
  // const whiteList = ['http://localhost:8000', 'http://localhost:8001'];

  // We setup middlewares here...
  app.use(cookieParser());
  app.use(
    cors({
      origin: (_origin, callback) => callback(null, true),
      credentials: true,
    })
  );
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(basePath, baseRouter);

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'x-api-key');
    next();
  });

  // Setup the sub routes
  baseRouter.use(authBasePath, authRouter);
  baseRouter.use(userBasePath, authMiddleware, userRouter);

  return app;
};
