import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";
import { insertBrand } from "../../database/brand/insertBrand";
import { getUuid } from "../../utils/getUuid";
import { formatDBBrandToBrand } from "./formatBrand";

interface AddNewBrandArgs {
  name: string;
}

// This should be seen as a "helper" functionality.
// A user can add a new Brand via this endpoint
// This is meant to be something like "Coca Cola", "First Price", "Hatting", etc.
export const postBrand = async (req: Request, res: Response): Promise<void> => {
  // Extract body from request
  const body = getRequestBody<AddNewBrandArgs>(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(addNewBrandSchema, body)
  );

  if (inputValidationError) {
    respond(res).error(inputValidationError, 422);
    return;
  }

  if (!inputValidity) {
    respond(res).error(new Error("Input is invalid"));
    return;
  }

  // Generate uuid for the Brand
  const brandId = getUuid();

  // Insert the new Brand
  const [insertError, insertedItem] = await perhaps(
    insertBrand({ id: brandId, name: body.name })
  );

  if (insertError) {
    respond(res).error(insertError);
    return;
  }

  if (!insertedItem) {
    respond(res).error(new Error("No item inserted, something went wrong"));
    return;
  }

  // Publish the result
  // TODO : Push the result to redis, the  let the handler take care of everything else.

  // Format the brand to camelCase
  const formattedBrand = formatDBBrandToBrand(insertedItem);

  // Return the new Brand
  respond(res).success(formattedBrand);
  return;
};

const addNewBrandSchema = yup.object({
  name: yup.string().required(),
});
