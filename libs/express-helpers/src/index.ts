import { Request, Response } from "express";

export const getRequestBody = <T>(req: Request): T => {
  return req.body;
};

export const getRequestParams = <T>(req: Request): T => {
  return req.params as unknown as T;
};

export const getRequestQueryParams = <T>(req: Request): T => {
  return req.query as unknown as T;
};

export const getRequestToken = (req: Request): string | undefined => {
  return req.headers.authorization;
};

/**
 * RESPOND
 */
interface RespondReturnValues<T> {
  success: (responseData: T) => void;
  error: (responseError: Error, code?: number) => void;
}

export const respond = <T>(res: Response): RespondReturnValues<T> => {
  const success = (responseData: T) => {
    res.status(200).json(responseData);
  };

  const error = (responseError: Error, code?: number) => {
    const formattedMessage =
      responseError.message || JSON.stringify(responseError);
    res.status(code || 500).send(formattedMessage);
  };

  return {
    success,
    error,
  };
};
