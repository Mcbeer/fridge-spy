import { IDBProduct, IProduct } from "../../models/IProduct";

export const formatDBProductToProduct = (dbProduct: IDBProduct): IProduct => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    addedBy: dbProduct.added_by,
    barcode: dbProduct.barcode,
    brand: dbProduct.brand_id,
    createdAt: dbProduct.created_at || "",
    imageUrl: dbProduct.image_url,
    productType: dbProduct.product_type_id,
    updatedAt: dbProduct.updated_at || "",
  };
};
