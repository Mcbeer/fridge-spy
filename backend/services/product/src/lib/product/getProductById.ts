import { Request, Response } from "express";
import { queryProductById } from "../../database/product/queryProductById";
import { getRequestParams } from "../../utils/getRequestParams";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
import { formatDBProductToProduct } from "./formatProduct";

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [queryError, product] = await perhaps(queryProductById(id));

  if (queryError) {
    respond(res).error(queryError);
    return;
  }

  if (!product) {
    respond(res).error(new Error("No product with that id..."));
    return;
  }
  const formattedProduct = formatDBProductToProduct(product);

  respond(res).success(formattedProduct);
  return;
};
