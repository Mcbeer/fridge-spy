import { Request, Response } from "express";
import { insertProduct } from "../../database/product/insertProduct";
import { IDBProduct } from "../../models/IProduct";
import { yup } from "../../utils/exportYup";
import { getRequestBody } from "../../utils/getRequestBody";
import { getUuid } from "../../utils/getUuid";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
import { validateSchema } from "../../utils/validateSchema";
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
export const addNewProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract body from request
  const body = getRequestBody<AddProductArgs>(req);

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
  const formattedProduct = formatDBProductToProduct(insertedProduct);

  // Publish the result

  // Return the new product
  respond(res).success(formattedProduct);
};

const addNewProductSchema = yup.object({
  productTypeId: yup.string().required(),
  name: yup.string().required(),
  brandId: yup.string().required(),
  barcode: yup.string().required(),
  imageUrl: yup.string().required(),
});
