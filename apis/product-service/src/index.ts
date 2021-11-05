import { productLogger } from "@fridgespy/logging";
import { AppCache } from "@fridgespy/utils";
import * as dotenv from "dotenv";
import { database } from "./database/database";
import { setupEventHandlers } from "./events";
import { setupExpressApp } from "./utils/setupExpressApp";
import {
  setupRedisClient,
  setupRedisPublisher,
  setupRedisSubscriber,
} from "./utils/setupRedisClient";

dotenv.config();

export const redisPublisher = setupRedisPublisher();
export const redisSubscriber = setupRedisSubscriber();
export const appCache = new AppCache(setupRedisClient());

const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  productLogger.info("Migrating product tables...");
  await database.migrate.latest();
  productLogger.info("Done migrating tables");

  productLogger.info("Setting up subscriber");
  setupEventHandlers();

  productLogger.info("Starting express on port 8000");
  expressApp.listen(8000);
};

// Runs the server
runServer();
