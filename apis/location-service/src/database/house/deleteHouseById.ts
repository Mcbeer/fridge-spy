import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const deleteHouseById = (id: string): Promise<number> => {
  return database(DatabaseTables.HOUSE).where({ id }).del();
};
