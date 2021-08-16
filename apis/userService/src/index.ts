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
    console.log('Error connecting to DB');
    console.error(err);
  });
  db.once('open', () => {
    console.log('Database connection is open');
  });

  logger.info('Starting express on port 8001');
  expressApp.listen(8001);
};

// Runs the server
runServer();
