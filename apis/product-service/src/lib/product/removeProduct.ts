import { getRequestParams, respond } from "@fridgespy/express-helpers";
import { ProductChannels } from "@fridgespy/types";
import { appEvents, perhaps } from "@fridgespy/utils";
import { Request, Response } from "express";
import { appCache, redisPublisher } from "../..";
import { deleteProductById } from "../../database/product/deleteProductById";

export const removeProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Extract the id from request params
  const { id } = getRequestParams<{ id: string }>(req);

  // Delete the item in DB
  const [deleteError] = await perhaps(deleteProductById(id));

  if (deleteError) {
    respond(res).error(
      new Error(
        "Product could not be deleted at this time, please try again later"
      )
    );
    return;
  }

  // Remove it from the redis cache
  appCache.del(`product#${id}`);

  // Publish the result to redis
  appEvents(redisPublisher).publish(ProductChannels.PRODUCT_DELETED, { id });

  // Return the deleted product id to the requester
  respond(res).success({ id });
  return;
};
