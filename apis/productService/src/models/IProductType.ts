import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IProductType extends ITimestamps {
  id: string;
  name: string;
  description: string;
}

export interface IDBProductType extends IDBTimestamps {
  id: string;
  name: string;
  description: string;
}
