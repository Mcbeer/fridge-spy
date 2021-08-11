import { IDBBrand } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryBrandById = (id: string): Promise<IDBBrand> => {
  return database(DatabaseTables.BRAND).where({ id }).first();
};
