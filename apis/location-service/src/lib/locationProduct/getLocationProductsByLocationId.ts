import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import { IProduct, IProductType } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import fetch from "cross-fetch";
import { Request, Response } from "express";
import { queryProductsOnLocation } from "../../database/locationProduct/queryProductsOnLocation";
import { formatDBLocationProductsListToLocationProductsList } from "./formatLocationItem";

export const getLocationProductsByLocationId = async (
  req: Request,
  res: Response
) => {
  const { locationId } = getRequestParams(req);

  if (!locationId) {
    locationLogger.error("No location id provided");
    respond(res).error(new Error("No location id provided"));
    return;
  }

  const [locationProductsError, locationProducts] = await perhaps(
    queryProductsOnLocation(locationId)
  );

  if (locationProductsError) {
    locationLogger.error(locationProductsError);
    respond(res).error(locationProductsError);
    return;
  }

  if (!locationProducts) {
    locationLogger.error("No location products found");
    respond(res).error(new Error("No location products found"));
    return;
  }

  const [productsError, products] = await perhaps<IProduct[]>(
    fetch(`http://fridgespy.local:8000/api/v1/product`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": process.env.API_KEY!,
      },
      method: "GET",
    }).then((data) => data.json() as Promise<IProduct[]>)
  );

  if (productsError) {
    locationLogger.error(productsError);
    respond(res).error(productsError);
    return;
  }

  const [productTypesError, productTypes] = await perhaps<IProductType[]>(
    fetch(`http://fridgespy.local:8000/api/v1/producttype`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": process.env.API_KEY!,
      },
      method: "GET",
    }).then((data) => data.json() as Promise<IProductType[]>)
  );

  if (productTypesError) {
    locationLogger.error(productTypesError);
    respond(res).error(productTypesError);
    return;
  }

  const formattedProducts = formatDBLocationProductsListToLocationProductsList(
    locationProducts,
    products ?? [],
    productTypes ?? []
  );

  respond(res).success(formattedProducts);
};
