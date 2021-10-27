import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json, Router, urlencoded } from "express";
import { eventsRouter } from "../routes/events.router";

export const setupExpressApp = (): Express => {
  const app = express();
  const apiVersion = "v" + process.env.API_VERSION;
  const basePath = `/api/${apiVersion}`;
  const baseRouter = Router();

  // Base routes declaration
  const eventsBasePath = "/events";
  // const productBasePath = "/product";
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

  app.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");

    next();
  });

  app.use(basePath, baseRouter);

  baseRouter.use(eventsBasePath, eventsRouter);

  return app;
};
