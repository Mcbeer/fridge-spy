import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const deleteProductById = async (id: string): Promise<number> => {
  return database(DatabaseTables.PRODUCT).where({ id }).del();
};
