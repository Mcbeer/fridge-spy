import { IUser } from '@fridgespy/types';
import { database } from '../database';
import { DatabaseTables } from '../dbTables';

export const getUserByEmail = async (email: string): Promise<IUser> => {
  return database(DatabaseTables.USER).where({ email }).first();
};
