import { respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { queryAllProductTypes } from "../../database/product_type/queryAllProductTypes";

export const getProductTypes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const [queryProductTypesError, productTypes] = await perhaps(
    queryAllProductTypes()
  );

  if (queryProductTypesError) {
    respond(res).error(
      new Error(
        "Could not get to all the product types at this time, please try again later"
      )
    );
    return;
  }

  if (!productTypes) {
    respond(res).error(
      new Error(
        "Could not get to all the product types at this time, please try again later"
      )
    );
    return;
  }

  respond(res).success(productTypes);
};
