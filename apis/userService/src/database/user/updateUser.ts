import { IUser } from '@fridgespy/types';
import { User } from './schema';

export const updateUser = async <T>(
  filter: { _id: string },
  update: T
): Promise<IUser> => {
  return await User.findOneAndUpdate(filter, update, { new: true }).exec();
};
