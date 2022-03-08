import { IDBLocationProduct } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryProductsOnLocation = async (
  locationId: string
): Promise<(IDBLocationProduct & { amount: number })[]> => {
  return database
    .select("LP.*")
    .count(`LPE.id as amount`)
    .from(`${DatabaseTables.LOCATION_PRODUCT} as LP`)
    .leftJoin(`${DatabaseTables.LOCATION_PRODUCT_ENTRY} as LPE`, function () {
      this.on(`LP.id`, "=", `LPE.location_product_id`);
    })
    .where(`LP.location_id`, locationId)
    .groupBy(`LP.id`);
};
