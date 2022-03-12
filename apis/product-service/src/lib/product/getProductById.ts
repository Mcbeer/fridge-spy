import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { productLogger } from "@fridgespy/logging";
import { IProduct } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache } from "../..";
import { queryBrandById } from "../../database/brand/queryBrandById";
import { queryProductById } from "../../database/product/queryProductById";
import { queryProductTypeById } from "../../database/product_type/queryProductTypeById";
import { formatDBProductToProduct } from "./formatProduct";

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [cacheProductError, cacheProduct] = await perhaps(
    appCache.get<IProduct>(`product#${id}`)
  );

  if (cacheProductError) {
    // ! Do not exit here, just continue and get the item from DB
    productLogger.error(cacheProductError);
  }

  if (cacheProduct) {
    respond<IProduct>(res).success(cacheProduct);
    return;
  }

  const [queryError, product] = await perhaps(queryProductById(id));

  if (queryError) {
    respond<Error>(res).error(queryError);
    return;
  }

  if (!product) {
    respond<Error>(res).error(new Error("No product with that id..."));
    return;
  }

  const [queryBrandError, brand] = await perhaps(
    queryBrandById(product.brand_id)
  );

  if (queryBrandError) {
    respond<Error>(res).error(queryBrandError);
    return;
  }

  const [queryProductTypeError, productType] = await perhaps(
    queryProductTypeById(product.product_type_id)
  );

  if (queryProductTypeError) {
    respond<Error>(res).error(queryProductTypeError);
    return;
  }

  const formattedProduct = formatDBProductToProduct({
    dbProduct: product,
    brand,
    productType,
  });

  if (!cacheProduct) {
    productLogger.info("Product not in cache...");
    appCache.set(`product#${id}`, JSON.stringify(formattedProduct));
  }

  respond<IProduct>(res).success(formattedProduct);
  return;
};
