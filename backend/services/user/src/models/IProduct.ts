export interface IProduct {
  id: string;
  name: string;
  barcode: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDBProduct {
  id: string;
  name: string;
  barcode: string;
  created_at: string;
  updated_at: string;
  product_type_id: string;
  brand_id: string;
  added_by: string;
}
