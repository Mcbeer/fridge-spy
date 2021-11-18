import { ITokenContent } from '@fridgespy/types';
import * as jwt from 'jsonwebtoken';

export const decodeToken = (token: string): ITokenContent => {
  return jwt.decode(token) as ITokenContent;
};
