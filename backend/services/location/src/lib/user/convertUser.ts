import { IDBUser, IUser } from "../../models/IUser";

export const convertDBUserToUser = (user: IDBUser): IUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatar_url,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};
