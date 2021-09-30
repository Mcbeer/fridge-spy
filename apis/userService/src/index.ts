import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '@fridgespy/logging';
import { setupExpressApp } from './utils/setupExpressApp';
import { setupDatabase } from './database/database';

dotenv.config();

export const expressApp = setupExpressApp();

setupDatabase();

const runServer = async (): Promise<void> => {
  const db = mongoose.connection;

  db.on('error', (err) => {
    logger.info('Error connecting to DB');
    logger.error(err);
  });
  db.once('open', () => {
    logger.info('Database connection is open');
  });

  logger.info('Starting express on port 8001');
  expressApp.listen(8001);
};

// Runs the server
runServer();
