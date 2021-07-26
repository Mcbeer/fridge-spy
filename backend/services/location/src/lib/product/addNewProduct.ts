import { Request, Response } from "express";
import { yup } from "../../utils/exportYup";
import { getRequestBody } from "../../utils/getRequestBody";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
import { validateSchema } from "../../utils/validateSchema";

// This should be seen as a "helper" functionality.
// A user can add a new product via this endpoint
// It will be tied to a product_type, so that must be provided, or the product is invalid
export const addNewProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract body from request
  const body = getRequestBody(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(addNewProductSchema, body)
  );

  if (inputValidationError) {
    respond(res).error(inputValidationError);
    return;
  }

  if (!inputValidity) {
    respond(res).error(new Error("Input is invalid"));
    return;
  }

  // Add the requester id to the new product, to fill out the "added_by" field

  // Generate uuid for the product

  // Insert the new product

  // Publish the result

  // Return the new product
};

const addNewProductSchema = yup.object({
  productTypeId: yup.string().required(),
  name: yup.string().required(),
  brandId: yup.string().required(),
  barcode: yup.string().required(),
  imageUrl: yup.string().required(),
});
