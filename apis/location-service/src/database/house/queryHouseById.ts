import { database } from "../database";
import { DatabaseTables } from "../dbTables";
import { IQueriedHouse } from "./queryHousesByUserId";

export const queryHouseById = (
  id: string,
  userId: string
): Promise<IQueriedHouse> => {
  return database
    .select("HO.*")
    .select("UH.user_role as role")
    .from(`${DatabaseTables.HOUSE} as HO`)
    .leftJoin(`${DatabaseTables.USER_HOUSE} as UH`, function () {
      this.on(`UH.house_id`, "=", `HO.id`);
    })
    .where(`UH.user_id`, userId)
    .andWhere("HO.id", id)
    .groupBy("HO.id")
    .groupBy("UH.user_role");
};
