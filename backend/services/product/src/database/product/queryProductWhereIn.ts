import { IDBProduct } from "../../models/IProduct";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryProductWhereIn = (ids: string[]): Promise<IDBProduct[]> => {
  return database(DatabaseTables.PRODUCT).whereIn("id", ids);
};
