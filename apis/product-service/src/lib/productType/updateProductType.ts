import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache } from "../..";
import { updateProductTypeById } from "../../database/product_type/updateProductTypeById";
import { formatDBProductTypeToProductType } from "./formatProductType";

export interface IUpdateProductTypeArgs {
  id: string;
  name?: string;
  description?: string;
}

export const updateProductType = async (req: Request, res: Response) => {
  const { id, name, description } = getRequestBody<IUpdateProductTypeArgs>(req);

  const [updateProductTypeError, updatedProductType] = await perhaps(
    updateProductTypeById({ id, name, description })
  );

  if (updateProductTypeError) {
    locationLogger.error(updateProductTypeError);
    respond(res).error(new Error("Could not update product type at this time"));
    return;
  }

  if (!updatedProductType) {
    locationLogger.error(updateProductTypeError);
    respond(res).error(new Error("Could not update product type at this time"));
    return;
  }

  const formattedProductType =
    formatDBProductTypeToProductType(updatedProductType);

  appCache.set(`productType#${id}`, formattedProductType);

  respond(res).success(formattedProductType);
  return;
};
