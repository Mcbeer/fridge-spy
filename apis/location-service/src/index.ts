import { locationLogger } from "@fridgespy/logging";
import { IUser } from "@fridgespy/types";
import * as dotenv from "dotenv";
import { database } from "./database/database";
import { setupExpressApp } from "./utils/setupExpressApp";
import {
  setupRedisClient,
  setupRedisPublisher,
  setupRedisSubscriber,
} from "./utils/setupRedisClient";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

dotenv.config();

export const redisPublisher = setupRedisPublisher();
export const redisSubscriber = setupRedisSubscriber();
export const redisClient = setupRedisClient();

export const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  locationLogger.info("Migrating...");
  await database.migrate.latest();
  locationLogger.info("Done migrating tables");

  locationLogger.info("Starting express on port 8000");
  expressApp.listen(8002);
};

// Runs the server
runServer();
