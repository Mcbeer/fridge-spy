import { Request } from "express";

export const getRequestBody = <T>(req: Request): T => {
  return req.body;
};
