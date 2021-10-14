import { logger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/utils';
import * as dotenv from 'dotenv';
import { database } from './database/database';
import { setupExpressApp } from './utils/setupExpressApp';
import { upsertRootUser } from './utils/upsertRootUser';

dotenv.config();

export const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  logger.info('Migrating tables...');
  await database.migrate.latest();
  logger.info('Migration successfull');

  logger.info('Upserting root account');
  const [upsertRootUserError] = await perhaps(upsertRootUser());

  if (upsertRootUserError) {
    logger.info('Root user already exists');
  } else {
    logger.info('Root user upserted');
  }

  logger.info('Starting express on port 8001');
  expressApp.listen(8001);
};

// Runs the server
runServer();
