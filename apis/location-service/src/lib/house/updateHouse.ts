import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { updateHouseById } from "../../database/house/updateHouseById";

interface IUpdateHouseArgs {
  id: string;
  name: string;
}

export const updateHouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Get the updated keys and id from body
  const body = getRequestBody<IUpdateHouseArgs>(req);

  // run the update query
  const [updateError, updatedHouse] = await perhaps(updateHouseById(body));

  if (updateError) {
    locationLogger.error(updateError);
    respond(res).error(
      new Error("Something went wrong with the update, please try again later")
    );
    return;
  }

  if (!updatedHouse) {
    locationLogger.error("No updated house returned from update query");
    respond(res).error(
      new Error("Something went wrong with the update, please try again later")
    );
    return;
  }

  // return the updated house
  respond(res).success({
    id: updatedHouse.id,
    name: updatedHouse.name,
    updatedAt: updatedHouse.updated_at,
  });
  return;
};
