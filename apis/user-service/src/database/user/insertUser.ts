import { IDBUser, IUser } from '@fridgespy/types';
import { head } from 'lodash';
import { getUuid } from '../../utils/getUuid';
import { database } from '../database';
import { DatabaseTables } from '../dbTables';

export interface InsertUserArgs {
  name: string;
  email: string;
  avatarUrl?: string;
  displayName?: string;
  metaData?: Record<string, unknown>;
}

export const insertUser = async (
  user: InsertUserArgs,
  password: string
): Promise<IUser> => {
  const dbUser: IDBUser = {
    id: getUuid(),
    name: user.name,
    avatar_url: user.avatarUrl,
    display_name: user.displayName,
    email: user.email,
    password,
    meta_data: user.metaData,
  };
  return database(DatabaseTables.USER).insert(dbUser).returning('*').then(head);
};
