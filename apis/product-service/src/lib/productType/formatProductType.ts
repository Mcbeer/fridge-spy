import { IDBProductType, IProductType } from "@fridgespy/types";

export const formatDBProductTypeToProductType = (
  input: IDBProductType
): IProductType => {
  return {
    id: input.id,
    name: input.name,
    description: input.description,
    createdAt: input.created_at || "",
    updatedAt: input.updated_at || "",
  };
};
