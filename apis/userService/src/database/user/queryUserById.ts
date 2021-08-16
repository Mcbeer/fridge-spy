import { IUser } from '@fridgespy/types';
import { User } from './schema';

export const queryUserById = async (id: string): Promise<IUser> => {
  return (await User.findById(id)) as unknown as IUser;
};
