import { Response } from 'express';

export const setTokens = (
  res: Response,
  tokens: { accessToken: string; refreshToken: string }
): void => {
  res.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    domain: '.fridgespy.local',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
  res.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    domain: '.fridgespy.local',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });
};
