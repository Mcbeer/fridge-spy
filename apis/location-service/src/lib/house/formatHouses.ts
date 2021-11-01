import { IHouse } from "@fridgespy/types";
import { formatArrayToObject } from "@fridgespy/utils";
import { IQueriedHouse } from "../../database/house/queryHousesByUserId";

export const formatDBHouseToHouse = (queriedHouse: IQueriedHouse): IHouse => {
  return {
    id: queriedHouse.id,
    name: queriedHouse.name,
    role: queriedHouse.role,
    createdAt: queriedHouse.created_at || "",
    updatedAt: queriedHouse.updated_at || "",
  };
};

export const formatHousesForFrontend = (houses: IHouse[]) => {
  return formatArrayToObject("id", houses);
};
