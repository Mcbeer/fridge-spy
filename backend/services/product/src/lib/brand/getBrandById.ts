import { Request, Response } from "express";
import { queryBrandById } from "../../database/brand/queryBrandById";
import { getRequestParams } from "../../utils/getRequestParams";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
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
