import { IDBProduct, IDBUpdateProduct } from "@fridgespy/types";
import { first } from "lodash";
import { getTimeNow } from "../../utils/getTimeNow";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const updateProductById = ({
  id,
  ...item
}: IDBUpdateProduct): Promise<IDBProduct> => {
  return database(DatabaseTables.PRODUCT)
    .where({ id })
    .update({ ...item, updated_at: getTimeNow() })
    .returning("*")
    .then(first);
};
