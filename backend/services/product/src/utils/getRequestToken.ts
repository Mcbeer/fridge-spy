import { Request } from "express";

export const getRequestToken = (req: Request): string | undefined => {
  return req.headers.authorization;
};
