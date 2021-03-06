import { IDBBrand } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

interface InsertBrandArgs {
  id: string;
  name: string;
}

export const insertBrand = (newBrand: InsertBrandArgs): Promise<IDBBrand> => {
  return database(DatabaseTables.BRAND)
    .insert(newBrand)
    .returning("*")
    .then((response) => response[0]);
};
