import { respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { queryAllBrands } from "../../database/brand/queryAllBrands";
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
