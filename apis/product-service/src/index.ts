import { productLogger } from "@fridgespy/logging";
import * as dotenv from "dotenv";
import { database } from "./database/database";
import { setupExpressApp } from "./utils/setupExpressApp";

dotenv.config();

const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  productLogger.info("Migrating product tables...");
  await database.migrate.latest();
  productLogger.info("Done migrating tables");

  productLogger.info("Starting express on port 8000");
  expressApp.listen(8000);
};

// Runs the server
runServer();
