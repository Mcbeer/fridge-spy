import { IDBUser } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryUserById = (id: string): Promise<IDBUser> => {
  return database(DatabaseTables.USER).where({ id }).first();
};