import { Request, Response } from "express";
import { queryUserById } from "../../database/user/queryUserById";
import { getRequestParams } from "../../utils/getRequestParams";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
import { convertDBUserToUser } from "./convertUser";

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [queryError, user] = await perhaps(queryUserById(id));

  if (queryError) {
    // Respond with error...
    respond(res).error(queryError);
    return;
  }

  if (!user) {
    // respond with error-like
    respond(res).error(new Error("No user found at this moment"));
    return;
  }

  const formattedUser = convertDBUserToUser(user);

  // Respond success
  respond(res).success(formattedUser);
};
