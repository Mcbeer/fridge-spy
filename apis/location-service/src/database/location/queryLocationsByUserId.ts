import { IDBLocation, UserRoles } from "@fridgespy/types";
import { database } from "../database";
import { DatabaseTables } from "../dbTables";

export const queryLocationsByUserId = async (
  userId: string
): Promise<IDBLocation[]> => {
  const usersLocations: {
    user_id: string;
    location_id: string;
    user_role: UserRoles;
  }[] = await database(DatabaseTables.USER_LOCATION).where({ user_id: userId });

  const locationIds = usersLocations.map(
    (userLocation) => userLocation.location_id
  );
  const locations = await database(DatabaseTables.LOCATION).whereIn(
    "id",
    locationIds
  );

  return locations.map((location) => ({
    ...location,
    user_role: usersLocations.find(
      (userLocation) => userLocation.location_id === location.id
    )?.user_role,
  }));
};
