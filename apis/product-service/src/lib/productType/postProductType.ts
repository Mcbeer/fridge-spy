import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { productLogger } from "@fridgespy/logging";
import { IProductType, ProductTypeChannels } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { validateSchema, yup } from "@fridgespy/validation";
import { Request, Response } from "express";
import { appCache, appEvents } from "../..";
import { insertProductType } from "../../database/product_type/insertProductType";
import { getUuid } from "../../utils/getUuid";
import { formatDBProductTypeToProductType } from "./formatProductType";

export interface IPostProductTypeArgs {
  name: string;
  description?: string;
}

// This should be seen as a "helper" functionality.
// A user can add a new product type via this endpoint
// This is meant to be something like "Milk", "Eggs", "Beer", etc.
export const postProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract body from request
  const body = getRequestBody<IPostProductTypeArgs>(req);

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
  const productTypeId = getUuid();

  // Insert the new product type
  const [insertProductTypeError, insertedProductType] = await perhaps(
    insertProductType({
      id: productTypeId,
      name: body.name,
      description: body.description,
    })
  );

  if (insertProductTypeError) {
    productLogger.error(insertProductTypeError);
    respond(res).error(
      new Error("Could not add the product type at this time")
    );
    return;
  }

  if (!insertedProductType) {
    productLogger.error("No product type inserted");
    respond(res).error(
      new Error(
        "Product type could not be added at this time, please try again"
      )
    );
    return;
  }

  // Format product type
  const formattedProductType =
    formatDBProductTypeToProductType(insertedProductType);

  // Cache the result
  appCache.set<IProductType>(
    `productType#${productTypeId}`,
    formattedProductType
  );

  // Publish the result
  appEvents.publish(
    ProductTypeChannels.PRODUCT_TYPE_CREATED,
    formattedProductType
  );

  // Return the new product type
  respond(res).success(formattedProductType);
  return;
};

const postProductTypeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});
