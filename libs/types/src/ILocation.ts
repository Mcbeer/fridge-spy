import { IProduct } from "./IProduct";
import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface ILocation extends ITimestamps {
  id: string;
  name: string;
  description: string;
  products: IProduct[];
}

export interface IDBLocation extends IDBTimestamps {
  id: string;
  name: string;
  description: string;
  house_id: string;
}
