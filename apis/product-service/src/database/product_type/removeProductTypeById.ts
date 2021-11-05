import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const removeProductTypeById = (id: string): Promise<number> => {
  return database(DatabaseTables.PRODUCT_TYPE).where({ id }).del();
};
