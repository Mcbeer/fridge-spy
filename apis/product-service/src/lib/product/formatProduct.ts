import {
  IDBBrand,
  IDBProduct,
  IDBProductType,
  IDBProductWithBrandAndProductType,
  IProduct,
} from "@fridgespy/types";

export const formatDBProductToProduct = ({
  dbProduct,
  brand,
  productType,
}: {
  dbProduct: IDBProduct;
  brand: IDBBrand | null | undefined;
  productType: IDBProductType | null | undefined;
}): IProduct => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    addedBy: dbProduct.added_by,
    barcode: dbProduct.barcode,
    brand: brand
      ? {
          id: brand.id,
          name: brand.name,
        }
      : undefined,
    imageUrl: dbProduct.image_url,
    productType: productType
      ? {
          id: productType.id,
          name: productType.name,
          description: productType.description || "",
        }
      : undefined,
    createdAt: dbProduct.created_at || "",
    updatedAt: dbProduct.updated_at || "",
  };
};

export const formatQueriedDBProductToProduct = (
  dbProduct: IDBProductWithBrandAndProductType
): IProduct => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    addedBy: dbProduct.added_by,
    barcode: dbProduct.barcode,
    brand: dbProduct.brand_id
      ? {
          id: dbProduct.brand_id,
          name: dbProduct.brand_name,
        }
      : undefined,
    imageUrl: dbProduct.image_url,
    productType: dbProduct.product_type_id
      ? {
          id: dbProduct.product_type_id,
          name: dbProduct.product_type_name,
          description: dbProduct.product_type_description || "",
        }
      : undefined,
    createdAt: dbProduct.created_at || "",
    updatedAt: dbProduct.updated_at || "",
  };
};
