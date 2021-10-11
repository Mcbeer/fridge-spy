import { IUser } from '@fridgespy/types';
import { getTimeNow } from '../../utils/getTimeNow';
import { User } from './schema';

interface InsertUserArgs {
  name: string;
  email: string;
  avatarUrl: string;
}

export const insertUser = async (
  user: InsertUserArgs,
  password: string
): Promise<IUser> => {
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: password,
    avatarUrl: user.avatarUrl,
    createdAt: getTimeNow(),
    updatedAt: null,
  });

  const savedUser = await newUser.save();

  return savedUser as unknown as IUser;
};
