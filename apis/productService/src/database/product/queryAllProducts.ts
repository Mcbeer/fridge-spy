import { IDBProduct } from "../../models/IProduct";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryAllProducts = (): Promise<IDBProduct[]> => {
  return database(DatabaseTables.PRODUCT);
};
