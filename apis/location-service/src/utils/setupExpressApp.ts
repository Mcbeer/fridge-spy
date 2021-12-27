import { authMiddleware } from "@fridgespy/express-helpers";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json, Router, urlencoded } from "express";
import { locationRouter } from "../routes/location.router";

export const setupExpressApp = (): Express => {
  const app = express();
  const apiVersion = "v" + (process.env.API_VERSION || 1);
  const basePath = `/api/${apiVersion}`;
  const baseRouter = Router();

  // Base routes declaration
  const locationBasePath = "/location";
  const productBasePath = "/product";
  // const productTypeBasePath = "/producttype";

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

  // We setup routes here...
  baseRouter.use(locationBasePath, authMiddleware, locationRouter);

  return app;
};
