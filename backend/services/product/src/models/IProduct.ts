import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IProduct extends ITimestamps {
  id: string;
  name: string;
  barcode: string;
  imageUrl: string;
  addedBy: string; // Fetch the user, and replace the ID with users name
  productType: string; // Replace ID with product type name
  brand: string; // Replace ID with brand name
}

export interface IDBProduct extends IDBTimestamps {
  id: string;
  name: string;
  barcode: string;
  product_type_id: string;
  brand_id: string;
  added_by: string;
}
