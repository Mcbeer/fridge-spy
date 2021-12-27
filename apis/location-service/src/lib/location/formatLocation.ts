import { IDBLocation, ILocation, UserRoles } from "@fridgespy/types";

export const formatLocation = (location: IDBLocation): ILocation => {
  return {
    id: location.id,
    name: location.name,
    description: location.description,
    userRole: location.user_role || UserRoles.USER,
    createdAt: location.created_at || "",
    updatedAt: location.updated_at || "",
  };
};
