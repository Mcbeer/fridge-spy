import { pushLogger } from "@fridgespy/logging";
import { AppEvents } from "@fridgespy/utils";
import * as dotenv from "dotenv";
import { setupEventListeners } from "./lib/setupEventListeners";
import { setupExpressApp } from "./utils/setupExpressApp";
import {
  setupRedisPublisher,
  setupRedisSubscriber,
} from "./utils/setupRedisClient";

dotenv.config();

export const appEvents = new AppEvents(
  setupRedisPublisher(),
  setupRedisSubscriber()
);

const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  pushLogger.info("Setting up event listeners");
  setupEventListeners();
  pushLogger.info("Event listeners are live and running");

  pushLogger.info("Starting express on port 8000");
  expressApp.listen(8000);
};

// Runs the server
runServer();
