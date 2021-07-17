import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IHouse extends ITimestamps {
  id: string;
  code: string;
  name: string;
}

export interface IDBHouse extends IDBTimestamps {
  id: string;
  code: string;
  name: string;
}
