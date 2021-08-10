import cors from "cors";
import express, { Express, json, Router, urlencoded } from "express";
import { productRouter } from "../routes/product.router";
import { productTypeRouter } from "../routes/productType.router";
import { userRouter } from "../routes/user.router";

export const setupExpressApp = (): Express => {
  const app = express();
  const apiVersion = "v" + process.env.API_VERSION;
  const basePath = `/api/${apiVersion}`;
  const baseRouter = Router();

  // Base routes declaration
  const userBasePath = "/user";
  const productBasePath = "/product";
  const productTypeBasePath = "/producttype";

  // We setup middlewares here...
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(basePath, baseRouter);

  // Setup the sub routes
  baseRouter.use(userBasePath, userRouter());
  baseRouter.use(productBasePath, productRouter());
  baseRouter.use(productTypeBasePath, productTypeRouter());

  return app;
};
