import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { IDBUpdateProduct, ProductChannels } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";
import { appCache, appEvents } from "../..";
import { queryBrandById } from "../../database/brand/queryBrandById";
import { updateProductById } from "../../database/product/updateProductById";
import { queryProductTypeById } from "../../database/product_type/queryProductTypeById";
import { formatDBProductToProduct } from "./formatProduct";

interface IUpdateProductArgs {
  id: string;
  name?: string;
  barcode?: string;
  productTypeId?: string;
  brandId?: string;
  imageUrl?: string;
}

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract the body from the request
  const body = getRequestBody<IUpdateProductArgs>(req);

  // Validate the body
  const [inputValidationError, inputValidity] = await perhaps(
    validateSchema(updateProductSchema, body)
  );

  if (inputValidationError) {
    respond(res).error(inputValidationError);
    return;
  }

  if (!inputValidity) {
    respond(res).error(new Error("Input is invalid"));
    return;
  }

  // Update the item in DB
  const dbProduct: IDBUpdateProduct = {
    id: body.id,
    name: body.name,
    barcode: body.barcode,
    product_type_id: body.productTypeId,
    brand_id: body.brandId,
    image_url: body.imageUrl,
  };

  const [updateError, updatedProduct] = await perhaps(
    updateProductById(dbProduct)
  );

  if (updateError) {
    respond(res).error(
      new Error(
        "Could not update the product at this time, please try again later"
      )
    );
    return;
  }

  if (!updatedProduct) {
    respond(res).error(
      new Error(
        "Could not update the product at this time, please try again later"
      )
    );
    return;
  }

  // Get all the other information we need to publish this right
  const [queryBrandError, brand] = await perhaps(
    queryBrandById(updatedProduct.brand_id)
  );

  if (queryBrandError) {
    respond<Error>(res).error(queryBrandError);
    return;
  }

  const [queryProductTypeError, productType] = await perhaps(
    queryProductTypeById(updatedProduct.product_type_id)
  );

  if (queryProductTypeError) {
    respond<Error>(res).error(queryProductTypeError);
    return;
  }

  const formattedProduct = formatDBProductToProduct({
    dbProduct: updatedProduct,
    brand,
    productType,
  });

  // Set the product in the cache
  appCache.set(`product#${updatedProduct.id}`, updatedProduct);

  // Publish the result to redis
  appEvents.publish(ProductChannels.PRODUCT_UPDATED, formattedProduct);

  // Return the updated product to the requester
  respond(res).success(updatedProduct);
  return;
};

const updateProductSchema = yup.object({
  id: yup.string().required(),
  productTypeId: yup.string(),
  name: yup.string(),
  brandId: yup.string(),
  barcode: yup.string(),
  imageUrl: yup.string(),
});
