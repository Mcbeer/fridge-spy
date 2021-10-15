import { getRequestParams, respond } from '@fridgespy/express-helpers';
import { logger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import { queryUserById } from '../../database/user/queryUserById';

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log('User in Req:', req.user);
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
