import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";

// This should be seen as a "helper" functionality.
// A user can add a new product type via this endpoint
// This is meant to be something like "Milk", "Eggs", "Beer", etc.
export const postProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract body from request
  const body = getRequestBody(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(postProductTypeSchema, body)
  );

  if (inputValidationError) {
    respond(res).error(inputValidationError);
    return;
  }

  if (!inputValidity) {
    respond(res).error(new Error("Input is invalid"));
    return;
  }

  // Generate uuid for the product type

  // Insert the new product type

  // Publish the result

  // Return the new product type
};

const postProductTypeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});
