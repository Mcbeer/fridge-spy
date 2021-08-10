import { IDBBrand } from "../../models/IBrand";
import { getTimeNow } from "../../utils/getTimeNow";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

interface UpdateBrandArgs {
  id: string;
  name: string;
}

export const updateBrand = ({
  id,
  name,
}: UpdateBrandArgs): Promise<IDBBrand> => {
  const updateTime = getTimeNow();
  return database(DatabaseTables.BRAND)
    .where({ id })
    .update({ name, updated_at: updateTime });
};
