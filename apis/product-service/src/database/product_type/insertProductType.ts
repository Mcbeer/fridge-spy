import { IDBProductType } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertProductType = async (
  productType: IDBProductType
): Promise<IDBProductType> => {
  return database(DatabaseTables.PRODUCT_TYPE)
    .insert(productType)
    .returning("*")
    .then((response) => response[0]);
};
