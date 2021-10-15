import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { IUser } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import fetch from "cross-fetch";
import { Request, Response } from "express";
import { queryBrandById } from "../../database/brand/queryBrandById";
import { queryProductById } from "../../database/product/queryProductById";
import { queryProductTypeById } from "../../database/product_type/queryProductTypeById";
import { formatDBProductToProduct } from "./formatProduct";

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);
  console.log("Requesting product by id", id);

  const [queryError, product] = await perhaps(queryProductById(id));

  if (queryError) {
    respond(res).error(queryError);
    return;
  }

  if (!product) {
    respond(res).error(new Error("No product with that id..."));
    return;
  }

  const [queryBrandError, brand] = await perhaps(
    queryBrandById(product.brand_id)
  );

  if (queryBrandError) {
    respond(res).error(queryBrandError);
    return;
  }

  const [queryProductTypeError, productType] = await perhaps(
    queryProductTypeById(product.product_type_id)
  );

  if (queryProductTypeError) {
    respond(res).error(queryProductTypeError);
    return;
  }

  const [queryAddedByUserError, addedByUser] = await perhaps(
    getUserById(product.added_by)
  );

  if (queryAddedByUserError) {
    respond(res).error(queryAddedByUserError);
    return;
  }

  if (!addedByUser) {
    respond(res).error(new Error("Could not fetch user..."));
    return;
  }

  const formattedProduct = formatDBProductToProduct({
    dbProduct: product,
    brand,
    productType,
    addedByUser,
  });

  respond(res).success(formattedProduct);
  return;
};

const getUserById = async (id: string): Promise<IUser> => {
  return fetch(`${process.env.USER_SERVICE_ENDPOINT}/user/${id}`, {
    credentials: "include",
  }).then((response) => response.json() as unknown as IUser);
};
