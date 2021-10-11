import { IUser } from '@fridgespy/types';
import { User } from './schema';

export const removeUser = async <T>(filter: {
  _id: string;
}): Promise<IUser> => {
  return await User.findOneAndDelete(filter).exec();
};
