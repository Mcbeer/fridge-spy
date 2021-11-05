import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { HouseChannels } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache, appEvents } from "../..";
import { deleteHouseById } from "../../database/house/deleteHouseById";

export const removeHouse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  appCache.del(`house#${id}`);

  const [deleteHouseError, deletedHouse] = await perhaps(deleteHouseById(id));

  if (deleteHouseError) {
    locationLogger.error(deleteHouseError);
    respond(res).error(
      new Error(
        "Could not remove the house at this time, please try again later"
      )
    );
    return;
  }

  if (!deletedHouse) {
    locationLogger.error("No houses deleted");
    respond(res).error(
      new Error(
        "Could not remove the house at this time, please try again later"
      )
    );
    return;
  }

  // Publish the event that a house is deleted
  appEvents.publish(HouseChannels.HOUSE_DELETE, { id });

  respond(res).success({ id });

  return;
};
