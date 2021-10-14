import { insertUser, InsertUserArgs } from '../database/user/insertUser';
import { hashPassword } from './hashPassword';

export const upsertRootUser = async (): Promise<void> => {
  const password = hashPassword(process.env.ROOT_USER_PASSWORD || '');

  const rootUser: InsertUserArgs = {
    email: 'nicolai.h.n@gmail.com',
    name: 'Nicolai Hornskov Nielsen',
  };

  await insertUser(rootUser, password);
};
