import { IBrand, IDBBrand } from "../../models/IBrand";

export const formatDBBrandToBrand = (dbBrand: IDBBrand): IBrand => {
  return {
    id: dbBrand.id,
    name: dbBrand.name,
    createdAt: dbBrand.created_at,
    updatedAt: dbBrand.updatedAt,
  };
};
