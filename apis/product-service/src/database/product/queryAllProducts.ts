import { IDBProductWithBrandAndProductType } from "@fridgespy/types";
import { database } from "../database";

export const queryAllProducts = (): Promise<
  IDBProductWithBrandAndProductType[]
> => {
  return database
    .raw(
      `select product.*, brand.name as brand_name, product_type.name as product_type_name, product_type.description as product_type_description from product inner join brand on product.brand_id = brand.id inner join product_type on product.product_type_id = product_type.id`
    )
    .then((result) => result.rows);
};
