import { UserRoles } from ".";
import { IDBTimestamps, ITimestamps } from "./ITimestamps";

export interface IHouse extends ITimestamps {
  id: string;
  name: string;
  role: UserRoles;
}

export interface IDBHouse extends IDBTimestamps {
  id: string;
  name: string;
}

export interface IDBUserHouse extends IDBTimestamps {
  id: string;
  user_id: string;
  house_id: string;
  user_role: UserRoles;
}
