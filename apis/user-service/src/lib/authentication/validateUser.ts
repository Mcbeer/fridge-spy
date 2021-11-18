import { getRequestBody, respond } from '@fridgespy/express-helpers';
import { userLogger } from '@fridgespy/logging';
import { AuthChannels, IUser } from '@fridgespy/types';
import { perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { appCache, appEvents } from '../..';
import { queryUserById } from '../../database/user/queryUserById';
import { formatDBUserToUser } from '../../utils/formatUser';
import { refreshAccessToken } from '../../utils/refreshAccessToken';
import { setTokens } from '../../utils/setTokens';

export const validateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const tokens =
    getRequestBody<{ accessToken: string; refreshToken: string }>(req);

  if (!tokens.accessToken || !tokens.refreshToken) {
    respond(res).error(
      new Error(
        'No tokens provided, please sign in before trying to validate...'
      )
    );

    return;
  }

  try {
    const validAccessToken = jwt.verify(
      tokens.accessToken,
      process.env.JWT_SECRET!
    );

    if(!validAccessToken || typeof validAccessToken !== 'object') {
      respond(res).error(new Error('Invalid access token'));
      return;
    }

    const [cacheUserError, cachedUser] = await perhaps<IUser | null>(
      appCache.get(`user#${validAccessToken.userId}`)
    );

    if (cacheUserError) {
      userLogger.info(cacheUserError);
    }

    if (cachedUser) {
      respond(res).success({ user: cachedUser, tokens: null });
      return;
    }

    const [userError, user] = await perhaps(
      queryUserById(validAccessToken.userId)
    );

    if (userError) {
      respond(res).error(new Error('Cannot query user for validation'));
      return;
    }

    if (!user) {
      respond(res).error(new Error('User not available...'));
      return;
    }
    appCache.set(`user#${validAccessToken.userId}`, user);
    appEvents.publish(AuthChannels.ON_VALIDATE, `${user.name} validated!`);
    respond(res).success({ user, tokens: null });
    return;
  } catch (err) {
    const newValidTokens = refreshAccessToken(
      tokens.accessToken,
      tokens.refreshToken
    );

    if (!newValidTokens) {
      const noValidTokens = new Error(
        'Cant make new tokens for you, please sign in again'
      );
      userLogger.error(noValidTokens);

      respond(res).error(noValidTokens);
      return;
    } else {
      const validAccessToken = jwt.verify(
        newValidTokens.accessToken,
        process.env.JWT_SECRET!
      );
      if(!validAccessToken || typeof validAccessToken !== 'object') {
        respond(res).error(new Error('Cannot validate your access at this time, please try again'));
        return;
      }

      setTokens(res, newValidTokens);

      const [cacheUserError, cachedUser] = await perhaps(
        appCache.get<IUser>(`user#${validAccessToken.userId}`)
      );

      if (cacheUserError) {
        userLogger.info(cacheUserError);
      }

      if (cachedUser) {
        respond(res).success({
          user: cachedUser,
          tokens: newValidTokens,
        });
        return;
      }

      const [userError, user] = await perhaps(
        queryUserById(validAccessToken.userId)
      );

      if (userError) {
        respond(res).error(new Error('Cannot query user for validation'));
        return;
      }

      if (!user) {
        respond(res).error(new Error('User not available...'));
        return;
      }
      const formattedUser = formatDBUserToUser(user);

      appCache.set<IUser>(`user#${validAccessToken.userId}`, formattedUser);
      respond(res).success({ user: formattedUser, tokens: newValidTokens });
      return;
    }
  }
};
