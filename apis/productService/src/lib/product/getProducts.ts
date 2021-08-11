import { getRequestQueryParams, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { Request, Response } from "express";
import { queryAllProducts } from "../../database/product/queryAllProducts";
import { queryProductWhereIn } from "../../database/product/queryProductWhereIn";
import { formatDBProductToProduct } from "./formatProduct";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { products } = getRequestQueryParams<{ products: string }>(req);

  if (!products) {
    const [queryError, allProducts] = await perhaps(queryAllProducts());

    if (queryError) {
      respond(res).error(queryError);
      return;
    }

    if (!allProducts) {
      respond(res).error(new Error("No products could be found..."));
      return;
    }

    const formattedProducts = allProducts.map(formatDBProductToProduct);

    respond(res).success(formattedProducts);
  } else {
    const productIds = products.split(",");

    const [queryError, queriedProducts] = await perhaps(
      queryProductWhereIn(productIds)
    );

    if (queryError) {
      respond(res).error(queryError);
      return;
    }

    if (!queriedProducts) {
      respond(res).error(new Error("No products with ids"));
      return;
    }

    const formattedProducts = queriedProducts.map(formatDBProductToProduct);

    respond(res).success(formattedProducts);
  }
};
