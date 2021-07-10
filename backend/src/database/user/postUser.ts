import { IDBUser } from "../../models/IUser";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const postUser = (user: IDBUser): Promise<IDBUser> => {
  return database(DatabaseTables.USER)
    .insert(user)
    .returning("*")
    .then((users: IDBUser[]) => users[0]);
};
