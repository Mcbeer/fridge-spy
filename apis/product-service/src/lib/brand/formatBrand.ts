import { IBrand, IDBBrand } from "@fridgespy/types";

export const formatDBBrandToBrand = (dbBrand: IDBBrand): IBrand => {
  return {
    id: dbBrand.id,
    name: dbBrand.name,
    createdAt: dbBrand.created_at || "",
    updatedAt: dbBrand.updated_at || "",
  };
};
