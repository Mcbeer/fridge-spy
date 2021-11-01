import { IDBUserHouse, UserRoles } from "@fridgespy/types";
import { first } from "lodash";
import { getUuid } from "../../utils/getUuid";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const insertUserHouse = ({
  houseId,
  userId,
  role,
}: {
  houseId: string;
  userId: string;
  role: UserRoles;
}): Promise<IDBUserHouse> => {
  const id = getUuid();
  return database(DatabaseTables.USER_HOUSE)
    .insert({ id, user_id: userId, house_id: houseId, role })
    .returning("*")
    .then(first);
};
