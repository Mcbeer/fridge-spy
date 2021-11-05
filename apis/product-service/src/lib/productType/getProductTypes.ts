import { respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { IProductType } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache } from "../..";
import { queryAllProductTypes } from "../../database/product_type/queryAllProductTypes";
import { formatDBProductTypeToProductType } from "./formatProductType";

export const getProductTypes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const [queryCacheError, cachedProductTypes] = await perhaps<IProductType[]>(
    appCache.get(`productTypes#all`)
  );

  if (queryCacheError) {
    locationLogger.error(queryCacheError);
  }

  if (cachedProductTypes && cachedProductTypes.length > 0) {
    respond(res).success(cachedProductTypes);
    return;
  }

  const [queryProductTypesError, productTypes] = await perhaps(
    queryAllProductTypes()
  );

  if (queryProductTypesError) {
    respond(res).error(
      new Error(
        "Could not get to all the product types at this time, please try again later"
      )
    );
    return;
  }

  if (!productTypes) {
    respond(res).error(
      new Error(
        "Could not get to all the product types at this time, please try again later"
      )
    );
    return;
  }

  const formattedProductTypes = productTypes.map(
    formatDBProductTypeToProductType
  );

  appCache.set(`productTypes#all`, formattedProductTypes);

  respond(res).success(formattedProductTypes);
  return;
};
