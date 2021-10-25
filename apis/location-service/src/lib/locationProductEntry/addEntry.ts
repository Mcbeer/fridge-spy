import { getRequestBody, respond } from "@fridgespy/express-helpers";
import { locationLogger } from "@fridgespy/logging";
import {
  IDBLocationProductEntry,
  LocationChannels,
  LocationProductEntryInputAction,
} from "@fridgespy/types";
import { appEvents, perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { times } from "lodash";
import { redisPublisher } from "../..";
import { queryLocationProduct } from "../../database/locationProduct/queryLocationProduct";
import { insertProductEntries } from "../../database/locationProductEntry/insertProductEntries";
import { getUuid } from "../../utils/getUuid";

interface AddEntryArgs {
  locationProductId: string;
  amount: number;
  inputAction?: LocationProductEntryInputAction;
}

export const addEntry = async (req: Request, res: Response): Promise<void> => {
  const { locationProductId, amount, inputAction } =
    getRequestBody<AddEntryArgs>(req);

  // Create the batch to insert
  const itemsToInsert: IDBLocationProductEntry[] = times(amount, () => ({
    id: getUuid(),
    location_product_id: locationProductId,
    input_action: inputAction || LocationProductEntryInputAction.MANUAL,
  }));

  // Insert items into DB
  const [batchInsertError, insertedItemsIds] = await perhaps(
    insertProductEntries(itemsToInsert)
  );

  if (batchInsertError) {
    locationLogger.error(batchInsertError);
    respond(res).error(new Error("Could not add your entries at this time"));
    return;
  }

  if (!insertedItemsIds || insertedItemsIds.length === 0) {
    respond(res).error(
      new Error(
        "An error occured whilst adding your entries, no entries was added"
      )
    );
    return;
  }

  // Fetch the Location Product and return it (it will then have the new amount on it)
  const [getLocationProductError, locationProduct] = await perhaps(
    queryLocationProduct(locationProductId)
  );

  if (getLocationProductError) {
    locationLogger.error(getLocationProductError);
    respond(res).error(
      new Error("We could not get to your product at this time")
    );
    return;
  }

  if (!locationProduct) {
    respond(res).error(
      new Error("We could not get to your product at this time")
    );
    return;
  }

  appEvents(redisPublisher).publish(
    LocationChannels.LOCATION_PRODUCT_UPDATED,
    locationProduct
  );

  respond(res).success(locationProduct);
  return;
};
