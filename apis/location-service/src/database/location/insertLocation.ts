import { IDBLocation } from "@fridgespy/types";
import { first } from "lodash";
import { getUuid } from "../../utils/getUuid";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertLocation = ({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<IDBLocation> => {
  return database(DatabaseTables.LOCATION)
    .insert({ id: getUuid(), name, description })
    .returning("*")
    .then(first);
};
