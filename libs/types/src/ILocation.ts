import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface ILocation extends ITimestamps {
  id: string;
  name: string;
  description: string;
  products: ILocationProduct[];
}

export interface IDBLocation extends IDBTimestamps {
  id: string;
  name: string;
  description: string;
  house_id: string;
}

export interface ILocationProduct extends ITimestamps {
  id: string;
  product?: { id: string; name: string };
  productType?: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
  minimumAmount: number;
  maximumAmount: number;
  amount: number;
}

export interface IDBLocationProduct extends IDBTimestamps {
  id: string;
  location_id: string;
  product_id?: string;
  product_type_id?: string;
  created_at: string;
  updated_at: string;
  minimum_amount: number;
  maximum_amount: number;
  deleted_at: string;
  amount?: string;
}

export interface IDBLocationProductEntry extends IDBTimestamps {
  id: string;
  location_product_id: string;
  created_at?: string;
  updated_at?: string;
  taken_at?: string;
  input_action?: LocationProductEntryInputAction;
  take_action?: LocationProductEntryTakeAction;
}

export enum LocationProductEntryInputAction {
  MANUAL = "MANUAL",
  SCAN = "SCAN",
}

export enum LocationProductEntryTakeAction {
  MANUAL = "MANUAL",
  SCAN = "SCAN",
}
