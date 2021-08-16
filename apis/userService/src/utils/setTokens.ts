import { Response } from 'express';

export const setTokens = (
  res: Response,
  tokens: { accessToken: string; refreshToken: string }
): void => {
  res.cookie('access_token', tokens.accessToken);
  res.cookie('refresh_token', tokens.refreshToken);
};
