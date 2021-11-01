import { IDBHouse } from "@fridgespy/types";
import { first } from "lodash";
import { getTimeNow } from "../../utils/getTimeNow";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const updateHouseById = ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<IDBHouse> => {
  return database(DatabaseTables.HOUSE)
    .where({ id })
    .update({ name, updated_at: getTimeNow() })
    .returning("*")
    .then(first);
};
