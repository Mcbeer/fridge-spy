import { Request, Response } from 'express';
import { getRequestParams, respond } from '@fridgespy/express-helpers';
import { perhaps } from '@fridgespy/perhaps';
import { queryUserById } from '../../database/user/queryUserById';
import { logger } from '@fridgespy/logging';

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [queryUserError, user] = await perhaps(queryUserById(id));

  if (queryUserError) {
    logger.error(queryUserError);
    respond(res).error(queryUserError);
    return;
  }

  if (!user) {
    const noUserError = new Error('No user with that id exists');
    logger.error(noUserError);
    respond(res).error(noUserError);
    return;
  }

  respond(res).success(user);
};
