import { IDBLocationProduct } from "@fridgespy/types";
import { first } from "lodash";
import { IAddLocationProduct } from "../../lib/locationProduct/addLocationProduct";
import { getUuid } from "../../utils/getUuid";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertLocationProduct = (
  args: IAddLocationProduct
): Promise<IDBLocationProduct> => {
  return database(DatabaseTables.LOCATION_PRODUCT)
    .insert({
      id: getUuid(),
      location_id: args.locationId,
      product_id: args.product?.id || undefined,
      product_type_id: args.productType?.id || undefined,
      minimum_amount: args.minimumAmount,
      maximum_amount: args.maximumAmount,
    })
    .returning("*")
    .then(first);
};
