import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IHouse extends ITimestamps {
  id: string;
  name: string;
}

export interface IDBHouse extends IDBTimestamps {
  id: string;
  name: string;
}
