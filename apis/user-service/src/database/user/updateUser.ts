import { IUser } from '@fridgespy/types';
import { getTimeNow } from '../../utils/getTimeNow';
import { User } from './schema';

export const updateUser = async <T>(
  filter: { _id: string },
  update: T
): Promise<IUser> => {
  return await User.findOneAndUpdate(
    filter,
    { ...update, updatedAt: getTimeNow() },
    { new: true }
  ).exec();
};
