import { IDBBrand } from "@fridgespy/types";
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
  return database(DatabaseTables.BRAND)
    .where({ id })
    .update({ name, updated_at: getTimeNow() });
};
