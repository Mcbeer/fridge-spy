import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { UserRoles } from "@fridgespy/types";
import { cache, perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { redisClient } from "../..";
import { deleteHouseById } from "../../database/house/deleteHouseById";
import { insertHouse } from "../../database/house/insertHouse";
import { insertUserHouse } from "../../database/userHouse/insertUserHouse";
import { formatDBHouseToHouse } from "./formatHouses";

interface IAddHouseArgs {
  name: string;
}

export const addHouse = async (req: Request, res: Response): Promise<void> => {
  // Get body from req
  const body = getRequestBody<IAddHouseArgs>(req);

  // Get the requester id
  const requesterId = req.user.id;

  // Add the new house to DB
  const [insertHouseError, insertedHouse] = await perhaps(
    insertHouse(body.name)
  );

  if (insertHouseError) {
    locationLogger.error(insertHouseError);
    respond(res).error(
      new Error(
        "Something went wrong whilst adding your house, please try again later"
      )
    );
    return;
  }

  if (!insertedHouse) {
    // Handle no house returned
    locationLogger.error("No house returned from insert statement");
    respond(res).error(
      new Error(
        "Something went wrong whilst adding your house, please try again later"
      )
    );
    return;
  }

  // Add the requster as an admin to the new house
  const [insertUserHouseError, userHouse] = await perhaps(
    insertUserHouse({
      houseId: insertedHouse.id,
      userId: requesterId,
      role: UserRoles.ADMIN,
    })
  );

  if (insertUserHouseError) {
    // Remove the house from the DB
    const [removeHouseError] = await perhaps(deleteHouseById(insertedHouse.id));

    if (removeHouseError) {
      locationLogger.error("Could not remove house with id:", insertedHouse.id);
    }

    respond(res).error(
      new Error(
        "Could not create the house at this time, please try again later"
      )
    );
    return;
  }

  if (!userHouse) {
    // Remove the house from the DB
    const [removeHouseError] = await perhaps(deleteHouseById(insertedHouse.id));

    if (removeHouseError) {
      locationLogger.error("Could not remove house with id:", insertedHouse.id);
    }

    // Handle no house returned
    respond(res).error(
      new Error(
        "Could not create the house at this time, please try again later"
      )
    );
    return;
  }

  // Format the house from the data we have in memory now
  const formattedHouse = formatDBHouseToHouse({
    ...insertedHouse,
    role: userHouse.user_role,
  });

  // Set the new house in the cache
  cache(redisClient).set(
    `house#${formattedHouse.id}-${requesterId}`,
    formattedHouse
  );

  // Return the new house
  respond(res).success(formattedHouse);
  return;
};
