import { getRequestBody, respond } from '@fridgespy/express-helpers';
import { perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import { insertUser } from '../../database/user/insertUser';
import { hashPassword } from '../../utils/hashPassword';

interface PostUserArgs {
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
}

export const postUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, avatarUrl } =
    getRequestBody<PostUserArgs>(req);

  const hashedPassword = hashPassword(password);

  const [insertUserError, savedUser] = await perhaps(
    insertUser({ name, avatarUrl, email }, hashedPassword)
  );

  if (insertUserError) {
    console.error('Error saving new user');
    console.error(insertUserError);
    respond(res).error(insertUserError);
    return;
  }

  respond(res).success(savedUser);
};
