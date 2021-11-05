import { IDBProductType } from "@fridgespy/types";
import { first } from "lodash";
import { IUpdateProductTypeArgs } from "../../lib/productType/updateProductType";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const updateProductTypeById = ({
  id,
  name,
  description,
}: IUpdateProductTypeArgs): Promise<IDBProductType> => {
  return database(DatabaseTables.PRODUCT_TYPE)
    .where({ id })
    .update({ name, description })
    .returning("*")
    .then(first);
};
