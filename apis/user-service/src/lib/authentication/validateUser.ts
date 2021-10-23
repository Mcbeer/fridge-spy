import { getRequestBody, respond } from '@fridgespy/express-helpers';
import { userLogger } from '@fridgespy/logging';
import { AuthChannels, IUser } from '@fridgespy/types';
import { cache, perhaps } from '@fridgespy/utils';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { redisClient, redisPublisher } from '../..';
import { queryUserById } from '../../database/user/queryUserById';
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
      process.env.JWT_SECRET
    );

    const [cacheUserError, cachedUser] = await perhaps(
      redisClient.get(`user#${validAccessToken.userId}`)
    );

    if (cacheUserError) {
      userLogger.info(cacheUserError);
    }

    if (cachedUser) {
      respond(res).success({ user: JSON.parse(cachedUser), tokens: null });
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
    redisClient.set(
      `user#${validAccessToken.userId}`,
      JSON.stringify(user),
      'EX',
      60
    );
    redisPublisher.publish(AuthChannels.ON_VALIDATE, `${user.name} validated!`);
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
        process.env.JWT_SECRET
      );

      setTokens(res, newValidTokens);

      const [cacheUserError, cachedUser] = await perhaps(
        cache(redisClient).get<IUser>(`user#${validAccessToken.userId}`)
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

      cache(redisClient).set<IUser>(`user#${validAccessToken.userId}`, user);
      respond(res).success({ user, tokens: newValidTokens });
      return;
    }
  }
};
