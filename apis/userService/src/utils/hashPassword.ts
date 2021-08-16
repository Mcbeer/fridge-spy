import { hashSync } from 'bcrypt';

export const hashPassword = (input: string): string => {
  return hashSync(input, 10);
};
