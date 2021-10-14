import { IUser } from '@fridgespy/types';
import { head } from 'lodash';
import { database } from '../database';
import { DatabaseTables } from '../dbTables';

export const removeUser = async (id: string): Promise<IUser> => {
  return database(DatabaseTables.USER)
    .where({ id })
    .del()
    .returning('*')
    .then(head);
};
