import { IDBBrand } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryAllBrands = (): Promise<IDBBrand[]> => {
  return database(DatabaseTables.BRAND);
};
