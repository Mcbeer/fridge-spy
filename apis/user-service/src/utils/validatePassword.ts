import { compareSync } from 'bcrypt';

export const validatePassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};
