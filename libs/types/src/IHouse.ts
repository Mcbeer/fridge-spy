import { ILocation } from "./ILocation";
import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IHouse extends ITimestamps {
  id: string;
  name: string;
  locations: ILocation[];
}

export interface IDBHouse extends IDBTimestamps {
  id: string;
  name: string;
}
