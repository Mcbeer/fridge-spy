import { locationLogger } from "@fridgespy/logging";
import { IUser } from "@fridgespy/types";
import * as dotenv from "dotenv";
import { database } from "./database/database";
import { publishClientEvent } from "./events/setupSSE";
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

  setTimeout(() => {
    console.log("Publishing something to SSE");
    publishClientEvent("8d8d52d4-c8e0-49c3-a538-9cdb45a18100", {
      random: "data",
    });
  }, 10000);

  locationLogger.info("Starting express on port 8002");
  expressApp.listen(8002);
};

// Runs the server
runServer();
