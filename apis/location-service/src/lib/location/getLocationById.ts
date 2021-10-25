import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { IDBLocation, ILocation } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { queryLocationById } from "../../database/location/queryLocationById";
import { queryProductsOnLocation } from "../../database/locationProduct/queryProductsOnLocation";

export const getLocationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [getLocationError, location] = await perhaps<IDBLocation>(
    queryLocationById(id)
  );

  if (getLocationError) {
    locationLogger.error(getLocationError);
    respond(res).error(new Error("Could not get your location at this time."));
    return;
  }

  if (!location) {
    respond(res).error(new Error("Could not get your location at this time."));
    return;
  }

  const [] = await perhaps(queryProductsOnLocation(id));

  const myEndStuff: ILocation[] = [];
};
