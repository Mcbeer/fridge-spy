import {
  getRequestBody,
  getRequestToken,
  respond,
} from '@fridgespy/express-helpers';
import { logger } from '@fridgespy/logging';
import { perhaps } from '@fridgespy/perhaps';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
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

  const validAccessToken = jwt.verify(
    tokens.accessToken,
    process.env.JWT_SECRET
  );

  if (!validAccessToken) {
    const newValidTokens = refreshAccessToken(
      tokens.accessToken,
      tokens.refreshToken
    );

    if (!newValidTokens) {
      const noValidTokens = new Error(
        'Cant make new tokens for you, please sign in again'
      );
      logger.error(noValidTokens);
      respond(res).error(noValidTokens);

      return;
    } else {
      // setTokens(res, newValidTokens);

      const [userError, user] = await perhaps(
        queryUserById(validAccessToken.userId)
      );

      if (userError) {
        respond(res).error(new Error('Cannot query user for validation'));
        return;
      }

      if (!user) {
        respond(res).error(new Error('User not available...'));
      }

      respond(res).success({ user, tokens: newValidTokens });
      return;
    }
  } else {
    const [userError, user] = await perhaps(
      queryUserById(validAccessToken.userId)
    );

    if (userError) {
      respond(res).error(new Error('Cannot query user for validation'));
      return;
    }

    if (!user) {
      respond(res).error(new Error('User not available...'));
    }
    respond(res).success({ user, tokens: null });
    return;
  }
};
