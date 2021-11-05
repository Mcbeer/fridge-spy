import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache } from "../..";
import { queryHouseById } from "../../database/house/queryHouseById";
import { formatDBHouseToHouse } from "./formatHouses";

export const getHouse = async (req: Request, res: Response): Promise<void> => {
  // get id from params
  const { id } = getRequestParams<{ id: string }>(req);

  const requesterId = req.user.id;

  // Check cache for house
  const [queryCachedHouseError, cachedHouse] = await perhaps(
    appCache.get(`house#${id}-${requesterId}`)
  );

  if (queryCachedHouseError) {
    locationLogger.error(queryCachedHouseError);
  }

  if (cachedHouse) {
    respond(res).success(cachedHouse);
    return;
  }

  // query house by id
  const [queryHouseError, house] = await perhaps(
    queryHouseById(id, requesterId)
  );

  if (queryHouseError) {
    locationLogger.error(queryHouseError);
    respond(res).error(
      new Error(
        "An error occured whilst querying the house, please try again later"
      )
    );
    return;
  }

  if (!house) {
    locationLogger.error(queryHouseError);
    respond(res).error(
      new Error("Are you sure you have access to this house?")
    );
    return;
  }

  // format house to be returned
  const formattedHouse = formatDBHouseToHouse(house);

  // set the house in cache
  appCache.set(`house#${id}-${requesterId}`, formattedHouse);

  // return the house
  respond(res).success(formattedHouse);
  return;
};
