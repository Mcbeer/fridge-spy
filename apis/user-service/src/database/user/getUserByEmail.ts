import { IDBUser } from '@fridgespy/types';
import { database } from '../database';
import { DatabaseTables } from '../dbTables';

export const getUserByEmail = async (email: string): Promise<IDBUser> => {
  return database(DatabaseTables.USER).where({ email }).first();
};
