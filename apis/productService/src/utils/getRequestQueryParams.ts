import { Request } from "express";

export const getRequestQueryParams = <T>(req: Request): T => {
  return req.query as unknown as T;
};
