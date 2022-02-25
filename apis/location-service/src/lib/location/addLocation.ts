import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { ILocationAddArgs } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { first } from "lodash";
import { database } from "../../database/database";
import { DatabaseTables } from "../../database/dbTables";
import { insertLocation } from "../../database/location/insertLocation";
import { getUuid } from "../../utils/getUuid";
import { formatLocation } from "./formatLocation";

export const addLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = getRequestBody<ILocationAddArgs>(req);

  // Validate the body input here

  const [insertLocationError, insertedLocation] = await perhaps(
    insertLocation(body)
  );

  if (insertLocationError) {
    locationLogger.error(insertLocationError);
    respond(res).error(insertLocationError);
    return;
  }

  if (!insertedLocation) {
    locationLogger.error("No location returned from insert statement");
    respond(res).error(
      new Error(
        "Something went wrong whilst adding your location, please try again later"
      )
    );
    return;
  }

  // Grant the user admin access to the new location
  const userAccess = await database(DatabaseTables.USER_LOCATION)
    .insert({
      id: getUuid(),
      user_id: req.user.id,
      location_id: insertedLocation.id,
      user_role: "ADMIN",
    })
    .returning("*")
    .then(first);

  const formattedLocation = formatLocation({
    ...insertedLocation,
    user_role: userAccess?.user_role,
  });

  respond(res).success(formattedLocation);
  return;
};
