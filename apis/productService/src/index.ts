import { logger } from "@fridgespy/logging";
import * as dotenv from "dotenv";
import { database } from "./database/database";
import { setupExpressApp } from "./utils/setupExpressApp";

dotenv.config();

const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  logger.info("Migrating product tables...");
  await database.migrate.latest();
  logger.info("Done migrating tables");

  logger.info("Starting express on port 8000");
  expressApp.listen(8000);
};

// Runs the server
runServer();
