import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { perhaps } from "@fridgespy/perhaps";
import { Request, Response } from "express";
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

  respond(res).success(formattedBrand);
};