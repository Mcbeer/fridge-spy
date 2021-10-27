import { IDBProductType } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryAllProductTypes = (): Promise<IDBProductType[]> => {
  return database(DatabaseTables.PRODUCT_TYPE);
};
