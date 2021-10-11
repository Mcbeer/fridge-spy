import * as jwt from 'jsonwebtoken';
import { generateTokens } from './generateTokens';

export const refreshAccessToken = (
  accessToken: string,
  refreshToken: string
): { accessToken: string; refreshToken: string } | null => {
  const validRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);

  if (!validRefreshToken) {
    return null;
  }

  const newTokens = generateTokens(validRefreshToken.userId);

  return { ...newTokens };
};
