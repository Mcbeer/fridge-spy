import {
  IDBBrand,
  IDBProduct,
  IDBProductType,
  IProduct,
  IUser,
} from "@fridgespy/types";

export const formatDBProductToProduct = ({
  dbProduct,
  brand,
  productType,
  addedByUser,
}: {
  dbProduct: IDBProduct;
  brand: IDBBrand | null | undefined;
  productType: IDBProductType | null | undefined;
  addedByUser: IUser;
}): IProduct => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    addedBy: {
      id: addedByUser.id,
      name: addedByUser.name,
      email: addedByUser.email,
    },
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
          description: productType.description,
        }
      : undefined,
    createdAt: dbProduct.created_at || "",
    updatedAt: dbProduct.updated_at || "",
  };
};
