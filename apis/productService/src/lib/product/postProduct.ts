import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { IDBProduct } from "@fridgespy/types";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";
import { insertProduct } from "../../database/product/insertProduct";
import { getUuid } from "../../utils/getUuid";
import { formatDBProductToProduct } from "./formatProduct";

interface AddProductArgs {
  name: string;
  barcode: string;
  image_url: string;
  productTypeId: string;
  brandId: string;
}

// This should be seen as a "helper" functionality.
// A user can add a new product via this endpoint
// It will be tied to a product_type, so that must be provided, or the product is invalid
export const postProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract body from request
  const body = getRequestBody<AddProductArgs>(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(postProductSchema, body)
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
  const addedById = req.user.id;

  // Generate uuid for the product
  const productId = getUuid();

  // Create the product object
  const dbProduct: IDBProduct = {
    id: productId,
    name: body.name,
    barcode: body.barcode,
    brand_id: body.brandId,
    product_type_id: body.productTypeId,
    added_by: addedById,
    image_url: body.image_url,
  };

  // Insert the new product
  const [insertProductError, insertedProduct] = await perhaps(
    insertProduct(dbProduct)
  );

  if (insertProductError) {
    respond(res).error(insertProductError);
    return;
  }

  if (!insertedProduct) {
    respond(res).error(new Error("No product inserted, unknown error..."));
    return;
  }

  // Format the product
  // const formattedProduct = formatDBProductToProduct(insertedProduct);

  // Publish the result

  // Return the new product
  respond(res).success(insertedProduct);
};

const postProductSchema = yup.object({
  productTypeId: yup.string().required(),
  name: yup.string().required(),
  brandId: yup.string().required(),
  barcode: yup.string().required(),
  imageUrl: yup.string(),
});
