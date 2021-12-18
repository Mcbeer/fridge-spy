import { IUser } from "@fridgespy/types";

export const getUserSelf = (): Promise<IUser> => {
  return fetch("http://fridgespy.local:8001/api/v1/user/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
};
