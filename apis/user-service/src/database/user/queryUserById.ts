import { IUser } from '@fridgespy/types';
import { database } from '../database';
import { DatabaseTables } from '../dbTables';

export const queryUserById = async (id: string): Promise<IUser> => {
  return database(DatabaseTables.USER).where({ id }).first();
};
