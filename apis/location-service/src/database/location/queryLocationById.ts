import { IDBLocation } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryLocationById = (id: string): Promise<IDBLocation> => {
  return database(DatabaseTables.LOCATION).where({ id }).first();
};
