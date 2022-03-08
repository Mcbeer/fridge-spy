import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import {
  IDBLocationProductEntry,
  LocationProductEntryInputAction,
} from "@fridgespy/types";
import { perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { times } from "lodash";
import { insertLocationProduct } from "../../database/locationProduct/insertLocationProduct";
import { insertProductEntries } from "../../database/locationProductEntry/insertProductEntries";
import { getUuid } from "../../utils/getUuid";
import { formatDBLocationItemToLocationItem } from "./formatLocationItem";

export interface IAddLocationProduct {
  locationId: string;
  product?: { id: string; name: string };
  productType?: { id: string; name: string };
  minimumAmount: number;
  maximumAmount: number;
  amount: number;
}

export const addLocationProduct = async (req: Request, res: Response) => {
  const body = getRequestBody<IAddLocationProduct>(req);

  console.log("Adding product to location", body);

  const [insertProductError, insertedProduct] = await perhaps(
    insertLocationProduct(body)
  );

  if (insertProductError) {
    locationLogger.error(insertProductError);
    respond(res).error(insertProductError);
    return;
  }

  if (!insertedProduct) {
    locationLogger.error("No product returned from insert statement");
    respond(res).error(
      new Error(
        "Something went wrong whilst adding your product, please try again later"
      )
    );
    return;
  }

  /** Insert the amount of items that was sent */
  const entriesToInsert: IDBLocationProductEntry[] = times(body.amount, () => {
    return {
      id: getUuid(),
      location_product_id: insertedProduct.id,
      input_action: LocationProductEntryInputAction.MANUAL,
    };
  });

  const [insertEntriesError, insertedEntries] = await perhaps(
    insertProductEntries(entriesToInsert)
  );

  if (insertEntriesError) {
    // TODO Delete the product if we end up here

    locationLogger.error(insertEntriesError);
    respond(res).error(insertEntriesError);
    return;
  }

  if (!insertedEntries) {
    // TODO Delete the product if we end up here

    locationLogger.error("No product returned from insert statement");
    respond(res).error(
      new Error(
        "Something went wrong whilst adding your product, please try again later"
      )
    );
    return;
  }

  const formattedLocationItem = formatDBLocationItemToLocationItem(
    insertedProduct,
    insertedEntries,
    body.product,
    body.productType
  );

  respond(res).success(formattedLocationItem);
};
