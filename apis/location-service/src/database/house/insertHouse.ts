import { IDBHouse } from "@fridgespy/types";
import { first } from "lodash";
import { getUuid } from "../../utils/getUuid";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertHouse = (name: string): Promise<IDBHouse> => {
  const id = getUuid();
  return database(DatabaseTables.HOUSE)
    .insert({ id, name })
    .returning("*")
    .then(first);
};
