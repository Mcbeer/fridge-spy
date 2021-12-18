import { IUser } from "@fridgespy/types";
import { authorizedFetch } from "@fridgespy/utils";

export const getUserSelf = (): Promise<IUser> => {
  return authorizedFetch("http://fridgespy.local:8001/api/v1/user/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
