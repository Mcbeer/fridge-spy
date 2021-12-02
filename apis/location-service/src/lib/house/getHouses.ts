import { respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { IHouse, IObjectList } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache } from "../..";
import { queryHousesByUserId } from "../../database/house/queryHousesByUserId";
import { formatDBHouseToHouse } from "./formatHouses";

export const getHouses = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    respond(res).error(new Error("User not found, are you logged in?"));
    return;
  }

  // Extract the user from the request
  const { id } = req.user;

  // Look to see if we have a cached result
  const [cacheError, cachedHouses] = await perhaps(
    appCache.get<IObjectList<IHouse>>(`houses#${id}`)
  );

  // If the cache errors out, just continue getting the houses from DB
  if (cacheError) {
    locationLogger.error(cacheError);
  }

  // If we have houses in the cache, return them
  if (cachedHouses) {
    respond<IObjectList<IHouse>>(res).success(cachedHouses);
    return;
  }

  // Query all houses for that user
  const [queryHousesError, houses] = await perhaps(queryHousesByUserId(id));

  if (queryHousesError) {
    locationLogger.error(queryHousesError);
    respond(res).error(queryHousesError);
    return;
  }

  if (!houses) {
    locationLogger.error("No houses returned from DB");
    respond(res).error(
      new Error("No houses found at this time, please try again")
    );
    return;
  }

  // Format houses as IHouse
  const convertedHouses = houses.map(formatDBHouseToHouse);

  // Save the houses to redis - key should be 'houses#<user_id>'
  appCache.set(`houses#${id}`, convertedHouses);

  // Return the houses to the requester
  respond(res).success(convertedHouses);
};
