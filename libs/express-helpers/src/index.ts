import { IUser } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import fetch from "cross-fetch";
import { NextFunction, Request, Response } from "express";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

/**
 * Returns the body of the request
 * @param req
 * @returns
 */
export const getRequestBody = <T>(req: Request): T => {
  return req.body;
};

/**
 * Returns the request parameters of the request
 * @param req
 * @returns
 */
export const getRequestParams = <T>(req: Request): T => {
  return req.params as unknown as T;
};

/**
 * Return any queryparams in the request
 * @param req
 * @returns
 */
export const getRequestQueryParams = <T>(req: Request): T => {
  return req.query as unknown as T;
};

/**
 * Retrieves the tokens from cookies
 * @param req
 * @returns
 */
export const getRequestToken = (
  req: Request
): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: req?.cookies?.access_token,
    refreshToken: req?.cookies?.refresh_token,
  };
};

interface RespondReturnValues<T> {
  success: (responseData: T) => void;
  error: (responseError: Error, code?: number) => void;
}

/**
 * Helper function to better handle response, like settings status and formatting data
 *
 * @template T
 * @param {Response} res
 * @return {*}  {RespondReturnValues<T>}
 */
export const respond = <T>(res: Response): RespondReturnValues<T> => {
  const success = (responseData: T) => {
    res.status(200).json(responseData);
  };

  const error = (responseError: Error, code?: number) => {
    const formattedMessage =
      responseError.message || JSON.stringify(responseError);
    res.status(code || 500).json({ code, message: formattedMessage });
  };

  return {
    success,
    error,
  };
};

/**
 * A try at making the respond function as a class, to see if it was better or worse
 *
 * @export
 * @class Responder
 * @template T
 */
export class Responder<T> {
  response;
  constructor(res: Response) {
    this.response = res;
  }

  success(responseData: T) {
    this.response.status(200).json(responseData);
  }

  error(responseError: Error, code?: number) {
    const formattedMessage =
      responseError.message || JSON.stringify(responseError);
    this.response.status(code || 500).json({ code, message: formattedMessage });
  }
}

/**
 * A helper middleware, that can be added to any service, to let it handle auth
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.headers["x-api-key"] === process.env.API_KEY) {
    next();
    return;
  }

  const tokens = getRequestToken(req);

  const [validateUserError, authorizedUser] = await perhaps(
    validateUser(tokens)
  );

  if (validateUserError) {
    respond(res).error(validateUserError);
    return;
  }

  if (!authorizedUser) {
    respond(res).error(new Error("User cannot be authorized at this time..."));
    return;
  }

  if (authorizedUser && authorizedUser.tokens) {
    res.cookie("access_token", authorizedUser.tokens.accessToken);
    res.cookie("refresh_token", authorizedUser.tokens.refreshToken);
  }

  // We are now authorized - set the user object on
  req.user = authorizedUser.user;

  next();
};

const validateUser = async (tokens: {
  accessToken: string;
  refreshToken: string;
}): Promise<{
  user: IUser;
  tokens: { accessToken: string; refreshToken: string };
}> => {
  return fetch(`${process.env.AUTH_URL}/auth/validate`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(tokens),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};
