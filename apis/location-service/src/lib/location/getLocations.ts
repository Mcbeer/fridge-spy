import { respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { queryLocationsByUserId } from "../../database/location/queryLocationsByUserId";
import { formatLocation } from "./formatLocation";

export const getLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req?.user?.id;

  if (!userId) {
    locationLogger.error("No user id provided");
    respond(res).error(new Error("No user id provided"));
    return;
  }

  // Fetch locations where the user has access
  const [queryLocationsError, locations] = await perhaps(
    queryLocationsByUserId(userId)
  );

  if (queryLocationsError) {
    locationLogger.error(queryLocationsError);
    respond(res).error(queryLocationsError);
    return;
  }

  if (!locations) {
    locationLogger.error("No locations found");
    respond(res).error(new Error("No locations found"));
    return;
  }

  const formattedLocations = locations.map(formatLocation);

  respond(res).success(formattedLocations);
};
