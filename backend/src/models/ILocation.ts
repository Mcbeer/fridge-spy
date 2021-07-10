import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface ILocation extends ITimestamps {
  id: string;
  name: string;
  description: string;
}

export interface IDBLocation extends IDBTimestamps {
  id: string;
  name: string;
  description: string;
  home_id: string;
}
