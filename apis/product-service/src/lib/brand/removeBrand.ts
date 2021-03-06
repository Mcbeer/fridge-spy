import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { BrandChannels, IBrand } from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache, appEvents } from "../..";
import { deleteBrand } from "../../database/brand/deleteBrand";
import { formatDBBrandToBrand } from "./formatBrand";

export const removeBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = getRequestParams<{ id: string }>(req);

  if (!id) {
    respond(res).error(new Error("No brand to delete with that ID"));
    return;
  }

  const [deleteError, deletedBrand] = await perhaps(deleteBrand(id));

  if (deleteError) {
    respond(res).error(deleteError);
    return;
  }

  if (!deletedBrand) {
    respond(res).error(
      new Error("Could not delete the item at this time. Unknown error occured")
    );
    return;
  }

  const formattedBrand = formatDBBrandToBrand(deletedBrand);

  appCache.del(`brand#${id}`);

  appEvents.publish<IBrand>(BrandChannels.BRAND_DELETED, formattedBrand);

  respond(res).success(formattedBrand);
};
