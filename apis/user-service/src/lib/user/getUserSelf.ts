import { getRequestToken, respond } from '@fridgespy/express-helpers';
import { userLogger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import { queryUserById } from '../../database/user/queryUserById';
import { decodeToken } from '../../utils/decodeToken';

export const getUserSelf = async (req: Request, res: Response) => {
  const requestToken = getRequestToken(req);

  if (!requestToken) {
    const noTokenError = new Error(
      'No request token found, how did you get through auth??'
    );
    userLogger.error(noTokenError);
    respond(res).error(noTokenError);

    return;
  }

  const tokenContent = decodeToken(requestToken.accessToken);

  if (!tokenContent?.userId) {
    const noUserIdError = new Error('No userId found in token');
    userLogger.error(noUserIdError);
    respond(res).error(noUserIdError, 404);

    return;
  }

  const [queryUserError, user] = await perhaps(
    queryUserById(tokenContent.userId)
  );

  if (queryUserError) {
    userLogger.error(queryUserError);
    respond(res).error(queryUserError);

    return;
  }

  if (!user) {
    const noUserError = new Error('No user found with that id');
    userLogger.error(noUserError);
    respond(res).error(noUserError);

    return;
  }

  respond(res).success(user);
};
