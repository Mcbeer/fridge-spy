import { IDBBrand } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const deleteBrand = (id: string): Promise<IDBBrand> => {
  return database(DatabaseTables.BRAND)
    .where({ id })
    .del()
    .returning("*")
    .then((response) => response[0]);
};
