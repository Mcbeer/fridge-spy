import { Request } from "express";

export const getRequestParams = <T>(req: Request): T => {
  return req.params as unknown as T;
};
