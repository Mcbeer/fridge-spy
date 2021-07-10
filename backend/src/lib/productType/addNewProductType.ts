import { Request, Response } from "express";
import { yup } from "../../utils/exportYup";
import { getRequestBody } from "../../utils/getRequestBody";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
import { validateSchema } from "../../utils/validateSchema";

// This should be seen as a "helper" functionality.
// A user can add a new product type via this endpoint
// This is meant to be something like "Milk", "Eggs", "Beer", etc.
export const addNewProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract body from request
  const body = getRequestBody(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(addNewProductTypeSchema, body)
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

const addNewProductTypeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});
