import { IDBProductType } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryProductTypeById = (id: string): Promise<IDBProductType> => {
  return database(DatabaseTables.PRODUCT_TYPE).where({ id }).first();
};
