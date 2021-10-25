import cors from "cors";
import express, { Express, json, Router, urlencoded } from "express";
import { setupSSE } from "../events/setupSSE";

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

  baseRouter.get("/events", setupSSE);

  return app;
};
