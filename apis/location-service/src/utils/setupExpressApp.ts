import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json, Router, urlencoded } from "express";
import { eventsRouter } from "../routes/events.router";
import { houseRouter } from "../routes/house.router";

export const setupExpressApp = (): Express => {
  const app = express();
  const apiVersion = "v" + process.env.API_VERSION;
  const basePath = `/api/${apiVersion}`;
  const baseRouter = Router();

  // Base routes declaration
  const eventsBasePath = "/events";
  const houseBasePath = "/house";
  // const productTypeBasePath = "/producttype";

  // We setup middlewares here...
  app.use(
    cors({
      origin: (_origin, callback) => callback(null, true),
      credentials: true,
    })
  );
  app.use(json());
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));

  app.use(basePath, baseRouter);

  baseRouter.use(eventsBasePath, eventsRouter);
  baseRouter.use(houseBasePath, houseRouter);

  return app;
};
