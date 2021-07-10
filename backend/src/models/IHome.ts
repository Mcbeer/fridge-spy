import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IHome extends ITimestamps {
  id: string;
  code: string;
  name: string;
}

export interface IDBHome extends IDBTimestamps {
  id: string;
  code: string;
  name: string;
}
