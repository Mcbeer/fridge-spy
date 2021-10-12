import { getRequestBody, respond } from '@fridgespy/express-helpers';
import { logger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import { getUserByEmail } from '../../database/user/getUserByEmail';
import { generateTokens } from '../../utils/generateTokens';
import { setTokens } from '../../utils/setTokens';
import { validatePassword } from '../../utils/validatePassword';

export const authorizeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } =
    getRequestBody<{ email: string; password: string }>(req);

  const [queryUserError, user] = await perhaps(getUserByEmail(email));

  if (queryUserError) {
    logger.error(queryUserError);
    respond(res).error(queryUserError);

    return;
  }

  if (!user) {
    const noUserError = new Error('No user found with that email');
    logger.error(noUserError);
    respond(res).error(noUserError);

    return;
  }

  const validPassword = validatePassword(password, user.password);

  if (!validPassword) {
    const invalidPasswordError = new Error('Password invalid');
    logger.error(invalidPasswordError);
    respond(res).error(invalidPasswordError);

    return;
  }

  const tokens = generateTokens(user.id);

  setTokens(res, tokens);

  respond(res).success(true);
};
