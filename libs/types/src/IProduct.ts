import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IProduct extends ITimestamps {
  id: string;
  name: string;
  barcode: string;
  imageUrl: string;
  addedBy: string; // The name of the user that added it
  productType?: {
    id: string;
    name: string;
    description: string;
  };
  brand?: {
    id: string;
    name: string;
  };
}

export interface IDBProduct extends IDBTimestamps {
  id: string;
  name: string;
  barcode: string;
  product_type_id: string;
  brand_id: string;
  added_by: string;
  image_url: string;
}

export interface IDBProductWithBrandAndProductType
  extends Omit<IDBProduct, "product_type_id, brand_id"> {
  product_type_id: string;
  product_type_name: string;
  product_type_description: string;
  brand_id: string;
  brand_name: string;
}

export interface IDBUpdateProduct extends IDBTimestamps {
  id: string;
  name?: string;
  barcode?: string;
  product_type_id?: string;
  brand_id?: string;
  image_url?: string;
}
