import { IUpdateDBUser, IUser } from '@fridgespy/types';
import { head } from 'lodash';
import { database } from '../database';
import { DatabaseTables } from '../dbTables';

export const updateUser = async (
  id: string,
  updateData: IUpdateDBUser
): Promise<IUser> => {
  // TODO: Add updated_at to be now
  return database(DatabaseTables.USER)
    .where({ id })
    .update({ ...updateData })
    .returning('*')
    .then(head);
};
