import { IUser } from '@fridgespy/types';
import { User } from './schema';

export const getUserByEmail = async (email: string): Promise<IUser> => {
  return await User.findOne({ email })
    .exec()
    .then((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
};
