import {
  IDBLocationProduct,
  ILocationProduct,
  IProduct,
  IProductType,
} from "@fridgespy/types";

export const formatDBLocationItemToLocationItem = (
  locationItem: IDBLocationProduct,
  items: string[],
  product?: { id: string; name: string },
  productType?: { id: string; name: string }
): ILocationProduct => {
  return {
    id: locationItem.id,
    locationId: locationItem.location_id,
    product,
    productType,
    minimumAmount: locationItem.minimum_amount,
    maximumAmount: locationItem.maximum_amount,
    amount: items.length,
    createdAt: locationItem.created_at,
    updatedAt: locationItem.updated_at,
  };
};

export const formatDBLocationProductsListToLocationProductsList = (
  items: (IDBLocationProduct & { amount: number })[],
  products: IProduct[],
  productTypes: IProductType[]
): ILocationProduct[] => {
  return items.map((item) => ({
    id: item.id,
    locationId: item.location_id,
    product: {
      id: item.product_id || "",
      name: products.find((prod) => prod.id === item.product_id)?.name || "",
    },
    productType: {
      id: item.product_type_id || "",
      name:
        productTypes.find((prodType) => prodType.id === item.product_type_id)
          ?.name || "",
    },
    minimumAmount: item.minimum_amount,
    maximumAmount: item.maximum_amount,
    amount: item.amount,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
};
