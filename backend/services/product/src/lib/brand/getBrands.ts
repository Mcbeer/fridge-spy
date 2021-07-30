import { Request, Response } from "express";
import { queryAllBrands } from "../../database/brand/queryAllBrands";
import { perhaps } from "../../utils/perhaps";
import { respond } from "../../utils/respond";
import { formatDBBrandToBrand } from "./formatBrand";

export const getBrands = async (req: Request, res: Response): Promise<void> => {
  const [queryBrandsError, brands] = await perhaps(queryAllBrands());

  if (queryBrandsError) {
    respond(res).error(queryBrandsError);
    return;
  }

  if (!brands) {
    respond(res).error(new Error("No brands found, like nothing"));
    return;
  }

  const formattedBrands = brands.map(formatDBBrandToBrand);

  respond(res).success(formattedBrands);
};
