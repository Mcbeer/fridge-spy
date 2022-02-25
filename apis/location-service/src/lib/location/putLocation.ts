import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { ILocationUpdateArgs } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";
import { SchemaOf } from "yup";
import { updateLocation } from "../../database/location/updateLocation";
import { formatLocation } from "./formatLocation";

export const putLocation = async (req: Request, res: Response) => {
  const body = getRequestBody<ILocationUpdateArgs>(req);

  // Validate the body input here
  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(updateLocationSchema, body)
  );

  if (inputValidationError) {
    respond(res).error(inputValidationError);
    return;
  }

  if (!inputValidity) {
    respond(res).error(new Error("Input is invalid"));
    return;
  }

  // Update the location
  const [updateLocationError, updatedLocation] = await perhaps(
    updateLocation(body)
  );

  if (updateLocationError) {
    locationLogger.error(updateLocationError);
    respond(res).error(updateLocationError);
    return;
  }

  if (!updateLocationError) {
    locationLogger.error("No location returned from update statement");
    respond(res).error(
      new Error(
        "Something went wrong whilst updating your location, please try again later"
      )
    );
    return;
  }

  const formattedLocation = formatLocation(updatedLocation);

  // Publish the updated location, so the push service can push it to clients

  respond(res).success(formattedLocation);
};

const updateLocationSchema: SchemaOf<ILocationUpdateArgs> = yup.object({
  id: yup.string().uuid().required(),
  name: yup.string().notRequired(),
  description: yup.string().notRequired(),
});
