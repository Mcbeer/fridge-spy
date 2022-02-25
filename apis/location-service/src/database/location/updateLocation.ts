import { ILocationUpdateArgs } from "@fridgespy/types";
import { first } from "lodash";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const updateLocation = (data: ILocationUpdateArgs) => {
  return database(DatabaseTables.LOCATION)
    .update({ name: data.name, description: data.description })
    .where({ id: data.id })
    .returning("*")
    .then(first);
};
