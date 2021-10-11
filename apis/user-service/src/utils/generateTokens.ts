import * as jwt from 'jsonwebtoken';
import { getUuid } from './getUuid';

export const generateTokens = (
  userId: string
): { accessToken: string; refreshToken: string } => {
  const accessTokenId = getUuid();
  const accessToken = jwt.sign(
    { userId, tokenId: accessTokenId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId, accessTokenId: accessTokenId, refreshId: getUuid() },
    process.env.JWT_SECRET,
    { expiresIn: '14d' }
  );

  return { accessToken, refreshToken };
};
