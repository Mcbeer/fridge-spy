import { locationLogger } from "@fridgespy/logging";
import { IUser, LocationChannels } from "@fridgespy/types";
import { AppCache, AppEvents } from "@fridgespy/utils";
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

export const appEvents = new AppEvents(
  setupRedisPublisher(),
  setupRedisSubscriber()
);
export const appCache = new AppCache(setupRedisClient());

export const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  locationLogger.info("Migrating...");
  await database.migrate.latest();
  locationLogger.info("Done migrating tables");

  locationLogger.info("Subscribing to channels");
  appEvents.subscribe([LocationChannels.LOCATION_PRODUCT_UPDATED]);
  locationLogger.info("Subscribed");

  appEvents.onMessage((channel, message) => {
    console.log(`Received message: ${message} on channel: ${channel}`);
  });

  setTimeout(() => {
    locationLogger.info("Publishing test event");
    appEvents.publish(LocationChannels.LOCATION_PRODUCT_UPDATED, {
      hello: "world!",
    });
  }, 2000);

  locationLogger.info("Starting express on port 8002");
  expressApp.listen(8002);
};

// Runs the server
runServer();
