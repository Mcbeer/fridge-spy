import { IDBLocationProductEntry } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertProductEntries = (
  items: IDBLocationProductEntry[]
): Promise<string[]> => {
  return database
    .batchInsert(DatabaseTables.LOCATION_PRODUCT_ENTRY, items)
    .returning("id");
};
