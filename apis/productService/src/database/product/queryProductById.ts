import { IDBProduct } from "../../models/IProduct";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryProductById = (id: string): Promise<IDBProduct> => {
  return database(DatabaseTables.PRODUCT).where({ id }).first();
};
