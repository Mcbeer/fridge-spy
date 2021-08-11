import { getRequestToken, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { IUser } from "@fridgespy/types";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = getRequestToken(req);

  if (!token) {
    respond(res).error(new Error("USER_NOT_AUTHORIZED"));
    return;
  }

  const [authorizeUserError, authorizedUser] = await perhaps(
    authorizeUser(token)
  );

  if (authorizeUserError) {
    respond(res).error(authorizeUserError);
    return;
  }

  if (!authorizedUser) {
    respond(res).error(new Error("User cannot be authorized at this time..."));
    return;
  }

  // We are now authorized - set the user object on
  req.user = authorizedUser;

  next();
};

const authorizeUser = async (token: string): Promise<IUser> => {
  return fetch(`${process.env.AUTH_ENDPOINT || ""}/authenticate/${token}`).then(
    (response) => response.json()
  );
};
