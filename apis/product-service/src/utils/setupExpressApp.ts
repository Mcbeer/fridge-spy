import { IUser } from "@fridgespy/types";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json, Router, urlencoded } from "express";
import { brandRouter } from "../routes/brand.router";
import { productRouter } from "../routes/product.router";
import { productTypeRouter } from "../routes/productType.router";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const setupExpressApp = (): Express => {
  const app = express();
  const apiVersion = "v" + (process.env.API_VERSION || 1);
  const basePath = `/api/${apiVersion}`;
  const baseRouter = Router();

  // Base routes declaration
  const brandBasePath = "/brand";
  const productBasePath = "/product";
  const productTypeBasePath = "/producttype";

  const whiteList = ["http://localhost:8000", "http://localhost:8001"];

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

  // Setup the sub routes
  baseRouter.use(brandBasePath, brandRouter);
  baseRouter.use(productBasePath, productRouter);
  baseRouter.use(productTypeBasePath, productTypeRouter);

  return app;
};
