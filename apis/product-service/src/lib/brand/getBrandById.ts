import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { queryBrandById } from "../../database/brand/queryBrandById";
import { formatDBBrandToBrand } from "./formatBrand";

export const getBrandById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  if (!id) {
    respond(res).error(new Error("No id provided to query, exiting"));
    return;
  }

  const [queryBrandError, brand] = await perhaps(queryBrandById(id));

  if (queryBrandError) {
    respond(res).error(queryBrandError);
    return;
  }

  if (!brand) {
    respond(res).error(new Error("No brand found with that ID"));
    return;
  }

  const formattedBrand = formatDBBrandToBrand(brand);

  respond(res).success(formattedBrand);
};
