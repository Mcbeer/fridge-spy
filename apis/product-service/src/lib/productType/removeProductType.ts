import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { productLogger } from "@fridgespy/logging";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache, appEvents } from "../..";
import { removeProductTypeById } from "../../database/product_type/removeProductTypeById";

export const removeProductType = async (req: Request, res: Response) => {
  const { id } = getRequestParams<{ id: string }>(req);

  const [removeProductError] = await perhaps(removeProductTypeById(id));

  if (removeProductError) {
    productLogger.error(removeProductError);
    respond(res).error(
      new Error("Could not remove product type at this time, please try again")
    );
    return;
  }

  appCache.del(`productType#${id}`);

  appEvents.publish;

  respond(res).success({ id });
};
