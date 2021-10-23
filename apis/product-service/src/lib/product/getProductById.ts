import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { productLogger } from "@fridgespy/logging";
import { IProduct, IUser } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import fetch from "cross-fetch";
import { Request, Response } from "express";
import { redisClient } from "../..";
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
    redisClient.get(`product#${id}`)
  );
  if (cacheProductError) {
    productLogger.error(cacheProductError);
  }

  if (cacheProduct) {
    respond<IProduct>(res).success(JSON.parse(cacheProduct));
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

  const [queryAddedByUserError, addedByUser] = await perhaps(
    getUserById(product.added_by)
  );

  if (queryAddedByUserError) {
    respond<Error>(res).error(queryAddedByUserError);
    return;
  }

  if (!addedByUser) {
    respond<Error>(res).error(new Error("Could not fetch user..."));
    return;
  }

  const formattedProduct = formatDBProductToProduct({
    dbProduct: product,
    brand,
    productType,
    addedByUser,
  });

  if (!cacheProduct) {
    productLogger.info("Product not in cache...");
    redisClient.set(
      `product#${id}`,
      JSON.stringify(formattedProduct),
      "EX",
      10
    );
  }

  respond<IProduct>(res).success(formattedProduct);
  return;
};

const getUserById = async (id: string): Promise<IUser> => {
  console.log("Getting user with id", id);
  return fetch(`${process.env.USER_SERVICE_ENDPOINT}/user/${id}`, {
    // @ts-ignore
    headers: {
      "Access-Control-Allow-Headers": "x-api-key",
      "x-api-key": process.env.API_KEY,
    },
  }).then((response) => response.json() as unknown as IUser);
};
