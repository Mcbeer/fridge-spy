import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IBrand extends ITimestamps {
  id: string;
  name: string;
}

export interface IDBBrand extends IDBTimestamps {
  id: string;
  name: string;
}
