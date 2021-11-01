import { IDBHouse, UserRoles } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export interface IQueriedHouse extends IDBHouse {
  role: UserRoles;
}

export const queryHousesByUserId = (
  userId: string
): Promise<IQueriedHouse[]> => {
  return database
    .select("HO.*")
    .select("UH.user_role as role")
    .from(`${DatabaseTables.HOUSE} as HO`)
    .leftJoin(`${DatabaseTables.USER_HOUSE} as UH`, function () {
      this.on(`UH.house_id`, "=", `HO.id`);
    })
    .where(`UH.user_id`, userId)
    .groupBy("HO.id")
    .groupBy("UH.user_role");
};
