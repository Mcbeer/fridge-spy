import { userLogger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/utils';
import * as dotenv from 'dotenv';
import { database } from './database/database';
import { setupAuthEventHandlers } from './events/authEvents';
import { setupExpressApp } from './utils/setupExpressApp';
import {
  setupRedisClient,
  setupRedisPublisher,
  setupRedisSubscriber,
} from './utils/setupRedisClient';
import { upsertRootUser } from './utils/upsertRootUser';

dotenv.config();

export const redisSubscriber = setupRedisSubscriber();
export const redisPublisher = setupRedisPublisher();
export const redisClient = setupRedisClient();

const expressApp = setupExpressApp();

const runServer = async (): Promise<void> => {
  userLogger.info('Migrating tables...');
  await database.migrate.latest();
  userLogger.info('Migration successfull');

  userLogger.info('Upserting root account');
  const [upsertRootUserError] = await perhaps(upsertRootUser());

  if (upsertRootUserError) {
    userLogger.info('Root user already exists');
  } else {
    userLogger.info('Root user upserted');
  }

  setupAuthEventHandlers();

  userLogger.info('Starting express on port 8001');
  expressApp.listen(8001, () => {
    userLogger.info(`User service running on http://localhost:8001`);
  });
};

// Runs the server
runServer();
