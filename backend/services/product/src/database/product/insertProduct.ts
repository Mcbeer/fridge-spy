import { IDBProduct } from "../../models/IProduct";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertProduct = (product: IDBProduct): Promise<IDBProduct> => {
  return database(DatabaseTables.PRODUCT)
    .insert(product)
    .returning("*")
    .then((response) => response[0]);
};
